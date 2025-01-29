# typed: true
# frozen_string_literal: true

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
module Cathendant
  class MemoSerializer < ApplicationSerializer
    # == Configuration
    object_as :memo

    # == Attributes
    identifier
    attributes :from
    attribute :recording_url, type: :string do
      rails_blob_path(memo.recording_blob)
    end
  end
end
