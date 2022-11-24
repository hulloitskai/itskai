# typed: strict
# frozen_string_literal: true

class ObsidianNoteAnalyzeJob < ApplicationJob
  extend T::Sig

  # == Configuration ==
  good_job_control_concurrency_with(
    enqueue_limit: 1,
    perform_limit: 1,
    key: -> do
      T.bind(self, ObsidianNoteAnalyzeJob)
      note = T.let(arguments.first, ObsidianNote)
      "#{self.class.name}:#{note.id}"
    end,
  )

  sig { params(note: ObsidianNote).void }
  def perform(note)
    analyze_references(note)
    analyze_blurb(note)
    note.update!(analyzed_at: Time.current)
  end

  private

  sig { params(note: ObsidianNote).void }
  def analyze_references(note)
    links = T.cast(note.content.scan(/\[\[[^\[\]]+\]\]/), T::Array[String])
    links.map! do |link|
      link.delete_prefix!("[[")
      link.delete_suffix!("]]")
      link.split("|").first
    end
    links.uniq!
    references = ObsidianNote.where(name: links).select(:id, :name)
    referenced_names = references.map(&:name)
    unresolved_reference_names = links - referenced_names
    unresolved_references =
      unresolved_reference_names.map do |name|
        ObsidianStub.find_or_initialize_by(name: name)
      end
    note.references = references
    note.unresolved_references = unresolved_references
  end

  sig { params(note: ObsidianNote).void }
  def analyze_blurb(note)
    return if note.blurb.present?
    doc = T.let(Markly.parse(note.content), Markly::Node)
    blurb_node = T.let(doc.first, Markly::Node)
    return unless blurb_node.type == :paragraph
    blurb = T.let(blurb_node.to_plaintext, String)
    blurb.strip!
    blurb.gsub!(/\[\[([^\[\]]+\|)?([^\[\]]+)\]\]/, '\2')
    blurb.tr!("\n", " ")
    note.blurb = blurb
  end
end
