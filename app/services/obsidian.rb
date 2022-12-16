# typed: strict
# frozen_string_literal: true

class Obsidian < ApplicationService
  # == Constants
  FrontMatter = T.type_alias { T::Hash[String, T.untyped] }

  # == Configuration
  config_accessor :vault_root_dir, default: Pathname.new("Obsidian/Kai")

  # == Initialization
  sig { void }
  def initialize
    super
    @vault_root = T.let(@vault_root, T.nilable(ICloud::Drive::Node))
  end

  # == Methods
  sig { override.returns(T::Boolean) }
  def ready? = ICloud.ready?

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

  sig { params(name: String).returns(T.nilable(ICloud::Drive::Node)) }
  def note_file(name)
    vault_root.get(name + ".md")
  end

  sig { params(name: String).returns(T.nilable(ObsidianNote)) }
  def note(name)
    file = note_file(name) or return nil
    data = parse_note_file(file)
    note = ObsidianNote.find_or_initialize_by(name:)
    note.synchronized_at = Time.current
    note.modified_at = file.modified_at!
    note.published = scoped do
      value = data["published"]
      case value
      when TrueClass
        true
      when String
        value.present?
      else
        false
      end
    end
    note.hidden = data["hidden"].truthy?
    note.slug = data["published"]
    note.display_name = data["display_name"].presence
    note.aliases = parse_frontmatter_list(data["aliases"])
    note.tags = parse_frontmatter_list(data["tags"])
    note.blurb = data["blurb"].presence
    note.content = data.content
    note
  rescue => error
    message = error.message
    if error.is_a?(PyCall::PyError)
      type, message = error.type.__name__, error.value.to_s
      if type == "PyiCloudAPIResponseException" &&
          message.ends_with?("(500)")
        message = "An unknown iCloud API error occurred"
      end
    end
    logger.error("Failed to read note '#{name}': #{message}")
    # Honeybadger.notify(message, backtrace: error.backtrace)
    nil
  end

  sig { params(name: String).returns(ObsidianNote) }
  def note!(name) = T.must(note(name))

  private

  # == Helpers
  sig { returns(ICloud::Drive::Node) }
  def vault_root
    @vault_root ||= ICloud.drive.get(Obsidian.vault_root_dir)
    @vault_root or raise "Can't retrieve Obsidian vault root"
  end

  sig do
    params(file: ICloud::Drive::Node).returns(FrontMatterParser::Parsed)
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

class Obsidian
  class << self
    sig { returns(T::Array[String]) }
    def note_names = instance.note_names

    sig { params(name: String).returns(T.nilable(ICloud::Drive::Node)) }
    def note_file(name) = instance.note_file(name)

    sig { params(name: String).returns(T.nilable(ObsidianNote)) }
    def note(name) = instance.note(name)

    sig { params(name: String).returns(ObsidianNote) }
    def note!(name) = instance.note!(name)
  end
end
