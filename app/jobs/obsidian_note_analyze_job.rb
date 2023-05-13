# typed: strict
# frozen_string_literal: true

class ObsidianNoteAnalyzeJob < ApplicationJob
  extend T::Sig

  # == Configuration
  good_job_control_concurrency_with(
    key: -> do
      T.bind(self, ObsidianNoteAnalyzeJob)
      note = T.let(arguments.first!, ObsidianNote)
      "#{self.class.name}:#{note.id}"
    end,
    total_limit: 1,
  )

  # == Callbacks
  before_perform :update_activity_status

  # == Job
  sig { params(note: ObsidianNote).void }
  def perform(note)
    analyze_references(note)
    analyze_blurb(note)
    note.update!(analyzed_at: Time.current)
  end

  private

  sig { params(note: ObsidianNote).void }
  def analyze_references(note)
    links = T.cast(
      note.content.scan(/(?<!\!)\[\[[^\[\]]+\]\]/),
      T::Array[String],
    )
    links.map! do |link|
      link.delete_prefix!("[[")
      link.delete_suffix!("]]")
      link.split("|").first!
    end
    links.uniq!
    references = ObsidianNote.where(name: links).select(:id, :name)
    referenced_names = references.map(&:name)
    unresolved_reference_names = links - referenced_names
    unresolved_references =
      unresolved_reference_names.map do |name|
        ObsidianStub.find_or_initialize_by(name:)
      end
    note.references = references
    note.unresolved_references = unresolved_references
  end

  sig { params(note: ObsidianNote).void }
  def analyze_blurb(note)
    return if note.content.blank?
    return if note.blurb.present?
    root = Markly.parse(note.content)
    node = T.let(root.first, T.nilable(Markly::Node))
    if node.present? && node.type.in?(%i[paragraph quote])
      blurb = node.to_plaintext.then do |text|
        text = T.let(text, String)
        text.strip!
        text.tr!("\n", " ")
        text
      end
      note.blurb = blurb.presence
    end
  end

  # == Callback Handlers
  sig { void }
  def update_activity_status
    note = T.let(arguments.first!, ObsidianNote)
    ActivityService.update_status("Analyzing note: #{note.name}")
  end
end
