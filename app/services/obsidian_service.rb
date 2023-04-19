# typed: true
# frozen_string_literal: true

class ObsidianService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return false unless super
      ICloudService.enabled?
    end

    # == Methods
    sig { returns(T::Array[String]) }
    def note_names = instance.note_names

    sig { params(name: String).returns(T.nilable(ICloudService::Drive::Node)) }
    def note_file(name) = instance.note_file(name)

    sig { params(name: String).returns(T.nilable(ObsidianNote)) }
    def note(name) = instance.note(name)

    sig { params(name: String).returns(ObsidianNote) }
    def note!(name) = instance.note!(name)
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
    return false unless super
    ICloudService.ready?
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

  sig { params(name: String).returns(T.nilable(ObsidianNote)) }
  def note(name)
    file = note_file(name) or return nil
    data = parse_note_file(file)
    note = ObsidianNote.find_or_initialize_by(name: name)
    note.attributes = {
      synchronized_at: Time.current,
      modified_at: file.modified_at!,
      published: scoped do
        value = data["publish"].presence
        case value
        when TrueClass
          true
        when String
          value.present?
        else
          false
        end
      end,
      hidden: data["hidden"].truthy?,
      title: data["title"].presence,
      slug: data["publish"].presence.try! do |value|
        value if value.is_a?(String)
      end,
      aliases: parse_frontmatter_list(data["aliases"]),
      tags: parse_frontmatter_list(data["tags"]),
      blurb: data["blurb"].presence,
      content: data.content,
    }
    note
  end

  sig { params(name: String).returns(ObsidianNote) }
  def note!(name) = T.must(note(name))

  private

  # == Helpers
  sig { returns(ICloudService::Drive::Node) }
  def vault_root
    @vault_root ||= ICloudService.drive.get(ObsidianService.vault_root_dir)
    @vault_root or raise "Can't retrieve Obsidian vault root"
  end

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
  def parse_frontmatter_list(value)
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
end
