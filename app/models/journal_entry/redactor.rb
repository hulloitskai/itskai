# typed: strict
# frozen_string_literal: true

class JournalEntry
  class Redactor
    extend T::Sig

    # == Constants
    REDACTION_PLACEHOLDER = "[REDACTED]"

    # == Initialization
    sig { params(notion_page: T.untyped).void }
    def initialize(notion_page)
      @notion_page = notion_page
    end

    # == Methods
    sig { params(blocks: T::Array[T.untyped]).void }
    def redact_blocks!(blocks)
      return if redacted_phrases.empty?
      blocks.each do |block|
        case block.type
        when "paragraph"
          redact_paragraph!(block.paragraph)
        else
          if (children = block["children"])
            redact_blocks!(children)
          end
        end
      end
    end

    private

    # == Helpers
    sig { returns(T::Array[String]) }
    def redacted_phrases
      @redacted_phrases ||= T.let(
        case @notion_page.properties["Redact"]["rich_text"].first
        in { plain_text: }
          property = T.let(plain_text, String)
          property.strip.split(",").map(&:strip)
        else
          []
        end,
        T.nilable(T::Array[String]),
      )
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
