# typed: true
# frozen_string_literal: true

# == Schema information
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
# == Schema information
#
# Table name: cathendant_memos
#
#  id             :uuid             not null, primary key
#  transcribed_at :datetime
#  transcript     :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class CathendantMemo < ApplicationRecord
  include Identifiable

  # == Attachments
  has_one_attached :recording

  # == Transcription
  def transcribe
    raise NotImplementedError, "Not implemented"
  end
end
