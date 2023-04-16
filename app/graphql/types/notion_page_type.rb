# typed: true
# frozen_string_literal: true

module Types
  class NotionPageType < BaseObject
    # == Constants
    REDACTION_PLACEHOLDER = "[REDACTED]"

    # == Fields
    field :blocks, GraphQL::Types::JSON, null: false
    field :id, String, null: false
    field :title, String, null: false

    sig { returns(String) }
    def title
      property = properties["Name"]["title"].first
      property.plain_text
    end

    sig { returns(T.untyped) }
    def blocks
      id = object["id"]
      Rails.cache.fetch(
        "notion_page_blocks/#{id}",
        expires_in: 10.minutes,
        race_condition_ttl: 10.seconds,
      ) do
        message = NotionService.client.block_children(block_id: id)
        message.results.tap { |blocks| redact_blocks!(blocks) }
      end
    end

    private

    # == Helpers
    sig { returns(T::Hash[String, T.untyped]) }
    def properties
      object["properties"]
    end

    sig { returns(T::Array[String]) }
    def redacted_phrases
      @redacted_phrases = T.let(@redacted_phrases, T.nilable(T::Array[String]))
      @redacted_phrases ||= scoped do
        property = properties["Redact"]["rich_text"].first
        if property.present?
          text = T.let(property.plain_text, String)
          text.strip.split(",").map(&:strip)
        else
          []
        end
      end
    end

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

    sig { params(paragraph: T.untyped).void }
    def redact_paragraph!(paragraph)
      paragraph.rich_text.each do |rich_text|
        redact_rich_text!(rich_text)
      end
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

# == Sorbet
module Types
  class NotionPageType
    # == Annotations
    sig { returns(T::Hash[String, T.untyped]) }
    def object = super
  end
end
