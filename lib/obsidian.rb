# typed: strict
# frozen_string_literal: true

require_relative "obsidian/railtie"

module Obsidian
  # == Configuration ==
  include ActiveSupport::Configurable
  config_accessor :vault_root
  config_accessor :logger

  class << self
    extend T::Sig

    # == Methods ==
    sig { returns(T::Array[String]) }
    def note_names
      root = self.root or return []
      nodes = root.children.select { |node| node.type == "file" }
      names = nodes.map(&:name)
      names.filter_map do |name|
        if !name.start_with?(".") && File.extname(name) == ".md"
          File.basename(name, ".md")
        end
      end
    end

    sig { returns(T::Array[ObsidianNote]) }
    def synchronize
      notes = ObsidianNote.all.to_a
      notes = T.let(notes, T::Array[ObsidianNote])
      notes_by_name = notes.index_by(&:name)
      notes_by_name = T.let(notes_by_name, T::Hash[String, ObsidianNote])
      removed_note_names = (notes_by_name.keys - note_names)
      removed_notes = T.unsafe(notes_by_name).fetch_values(*removed_note_names)
      removed_notes = T.let(removed_notes, T::Array[ObsidianNote])
      added_note_names = (note_names - notes_by_name.keys)
      added_note_names.each do |name|
        notes_by_name[name] = ObsidianNote.new(name: name)
      end
      notes_by_name.filter! do |_, note|
        update_note!(note).tap { |keep| removed_notes << note unless keep }
      end
      notes = notes_by_name.values
      ActiveRecord::Base.transaction do
        notes.each(&:save!)
        removed_notes.each(&:destroy!)
      end
      notes
    end

    private

    # == Helpers ==
    sig { returns(T.nilable(ICloud::Drive::Node)) }
    def root
      @root = T.let(@root, T.nilable(ICloud::Drive::Node))
      @root ||=
        scoped do
          ICloud.drive.get(Obsidian.vault_root) if ICloud.authenticated?
        end
    end

    sig { returns(ICloud::Drive::Node) }
    def root!
      T.must(root)
    end

    sig { params(note: ObsidianNote).returns(T::Boolean) }
    def update_note!(note)
      root = root!
      node = root.get(note.name + ".md") or return false
      modified_at = node.modified_at
      if modified_at.nil?
        modified_at = Time.current
        logger.warn(
          "Missing last modified timestamp for note '#{note.name}', " \
            "defaulting to current time",
        )
      end
      if !note.modified_at? || note.modified_at < modified_at
        logger.info("Updating note '#{note.name}'")
        data = parse_with_front_matter(node)
        content = T.let(data.content, String)
        front_matter = T.let(data.front_matter, T::Hash[String, T.untyped])
        note.modified_at = modified_at
        note.content = content
        note.aliases = parse_aliases(front_matter)
        note.tags = parse_tags(front_matter)
      end
      note.validate.tap do |valid|
        unless valid
          logger.warn(
            "Failed to update note '#{note.name}': " +
              note.errors.full_messages.to_sentence,
          )
        end
      end
    rescue => error
      message = error.message
      if error.is_a?(PyCall::PyError)
        type, message = error.type.__name__, error.value.to_s
        if type == "PyiCloudAPIResponseException" && message.ends_with?("(500)")
          message = "An unknown iCloud API error occurred"
        end
      end
      logger.error("Failed to update note '#{note.name}': #{message}")
      false
    end

    sig { params(node: ICloud::Drive::Node).returns(FrontMatterParser::Parsed) }
    def parse_with_front_matter(node)
      @parser = T.let(@parser, T.nilable(FrontMatterParser::Parser))
      @parser ||=
        FrontMatterParser::Parser.new(
          :md,
          loader:
            FrontMatterParser::Loader::Yaml.new(allowlist_classes: [Date]),
        )
      @parser.call(node.read)
    end

    sig do
      params(front_matter: T::Hash[String, T.untyped]).returns(T::Array[String])
    end
    def parse_tags(front_matter)
      tags = front_matter.fetch("tags") { [] }
      Array.wrap(tags)
    end

    sig do
      params(front_matter: T::Hash[String, T.untyped]).returns(T::Array[String])
    end
    def parse_aliases(front_matter)
      aliases = front_matter.fetch("aliases") { [] }
      Array.wrap(aliases)
    end
  end

  ActiveSupport.run_load_hooks(:obsidian, self)
end
