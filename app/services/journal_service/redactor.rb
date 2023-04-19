# typed: true
# frozen_string_literal: true

class JournalService
  class Redactor
    extend T::Sig

    # == Constants
    REDACTION_PLACEHOLDER = "[REDACTED]"

    # == Initialization
    sig { params(entry: T.untyped).void }
    def initialize(entry)
      @entry = entry
    end

    # == Methods
    sig { params(blocks: T::Array[T.untyped]).void }
    def redact_blocks!(blocks)
      return if redacted_phrases.empty?
      blocks.each do |block|
        case block.type
        when "paragraph"
          redact_paragraph!(block.paragraph)
        end
      end
    end

    private

    # == Attributes
    sig { returns(T.untyped) }
    attr_reader :entry

    # == Helpers
    sig { returns(T::Array[String]) }
    def redacted_phrases
      @redacted_phrases = T.let(@redacted_phrases, T.nilable(T::Array[String]))
      @redacted_phrases ||= scoped do
        property = entry.properties["Redact"]["rich_text"].first
        if property.present?
          text = T.let(property.plain_text, String)
          text.strip.split(",").map(&:strip)
        else
          []
        end
      end
    end

    sig { params(paragraph: T.untyped).void }
    def redact_paragraph!(paragraph)
      paragraph.rich_text.each { |rich_text| redact_rich_text!(rich_text) }
    end

    sig { params(rich_text: T.untyped).void }
    def redact_rich_text!(rich_text)
      redacted_phrases.each do |phrase|
        rich_text.text.content.gsub!(phrase, REDACTION_PLACEHOLDER)
        rich_text.plain_text.gsub!(phrase, REDACTION_PLACEHOLDER)
      end
    end
  end
end
