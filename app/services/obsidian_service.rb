# typed: true
# frozen_string_literal: true

class ObsidianService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return @disabled if defined?(@disabled)
      @disabled = !!(super || ICloudService.disabled?)
    end

    # == Methods
    sig { returns(T::Array[String]) }
    def note_names
      checked { instance.note_names }
    end

    sig { params(name: String).returns(T.nilable(ICloudService::Drive::Node)) }
    def note_file(name)
      checked { instance.note_file(name) }
    end

    sig { params(name: String).returns(T.nilable(ParsedNote)) }
    def note(name)
      checked { instance.note(name) }
    end

    sig { params(name: String).returns(ParsedNote) }
    def note!(name)
      checked { instance.note!(name) }
    end
  end

  # == Constants
  FrontMatter = T.type_alias { T::Hash[String, T.untyped] }

  # == Configuration
  config_accessor :vault_root_dir, default: Pathname.new("Obsidian/Kai")

  # == Initialization
  sig { void }
  def initialize
    super
    @vault_root = T.let(@vault_root, T.nilable(ICloudService::Drive::Node))
  end

  # == Methods
  sig { override.returns(T::Boolean) }
  def ready?
    !!(super && ICloudService.ready?)
  end

  sig { returns(T::Array[String]) }
  def note_names
    nodes = vault_root.children.select { |node| node.type == "file" }
    names = nodes.map(&:name)
    names.filter_map do |name|
      if !name.start_with?(".") && File.extname(name) == ".md"
        File.basename(name, ".md")
      end
    end
  end

  sig { params(name: String).returns(T.nilable(ICloudService::Drive::Node)) }
  def note_file(name)
    Rails.error.handle(context: { note_name: name }) do
      vault_root.get(name + ".md")
    rescue => error
      if error.is_a?(PyCall::PyError)
        type, message = error.type.__name__, error.value.to_s
        case
        when type == "IndexError"
          return nil
        when type == "PyiCloudAPIResponseException" &&
          message.ends_with?("(500)")
          logger.error(
            "Failed to read note '#{name}': Unknown iCloud API error occurred",
          )
          return nil
        end
      end
      logger.error("Failed to read note '#{name}': #{error}")
      raise "Failed to read note"
    end
  end

  sig { params(name: String).returns(T.nilable(ParsedNote)) }
  def note(name)
    file = note_file(name) or return nil
    parsed = parse_note_file(file)
    content, front_matter = parsed.content, parsed.front_matter
    publish = front_matter["publish"].presence
    published, slug = case publish
    when TrueClass
      true
    when String
      [publish.present?, publish]
    else
      false
    end
    meta = NoteMeta.new(
      modified_at: file.modified_at!,
      published:,
      hidden: front_matter["hidden"].truthy?,
      title: front_matter["title"].presence,
      slug:,
      aliases: parse_front_matter_list(front_matter["aliases"]),
      tags: parse_front_matter_list(front_matter["tags"]),
      blurb: front_matter["blurb"].presence,
    )
    ParsedNote.new(meta:, content:)
  end

  sig { params(name: String).returns(ParsedNote) }
  def note!(name)
    note(name) or raise "No such note `#{name}'"
  end

  private

  # == Helpers
  sig do
    params(file: ICloudService::Drive::Node).returns(FrontMatterParser::Parsed)
  end
  def parse_note_file(file)
    @parser = T.let(@parser, T.nilable(FrontMatterParser::Parser))
    @parser ||= FrontMatterParser::Parser.new(
      :md,
      loader: FrontMatterParser::Loader::Yaml.new(
        allowlist_classes: [Date],
      ),
    )
    @parser.call(file.read)
  end

  sig { params(value: T.untyped).returns(T::Array[String]) }
  def parse_front_matter_list(value)
    case value.presence
    when String
      value.split(",").map(&:strip)
    when Array
      value.compact.map(&:to_s)
    when nil
      []
    else
      [value.to_s]
    end
  end

  # == Helpers
  sig { returns(ICloudService::Drive::Node) }
  def vault_root
    @vault_root ||= ICloudService.drive.get(ObsidianService.vault_root_dir)
    @vault_root or raise "Can't retrieve Obsidian vault root"
  end
end
