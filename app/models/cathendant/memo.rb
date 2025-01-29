# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: cathendant_memos
#
#  id             :uuid             not null, primary key
#  from           :string           not null
#  transcribed_at :datetime
#  transcript     :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
module Cathendant
  class Memo < ApplicationRecord
    # == Attachments
    has_one_attached :recording

    # == Validations
    validates :from, :recording, presence: true

    # == Transcription
    def transcribe
      raise NotImplementedError, "Not implemented"
    end
  end
end
