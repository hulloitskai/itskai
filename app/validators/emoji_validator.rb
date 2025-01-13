# typed: true
# frozen_string_literal: true

class EmojiValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.nil? && options[:allow_nil]

    unless (matches = value.match(Unicode::Emoji::REGEX)) &&
        (matches.length == 1) &&
        (only_match = matches[0]) &&
        (only_match.length == value.length)
      record.errors.add(attribute, (options[:message] || :invalid))
    end
  end
end
