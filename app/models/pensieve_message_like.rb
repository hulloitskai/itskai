# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: pensieve_message_likes
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  message_id :uuid             not null
#  session_id :string           not null
#
# Indexes
#
#  index_pensieve_message_likes_on_message_id  (message_id)
#  index_pensieve_message_likes_uniqueness     (message_id,session_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_id => pensieve_messages.id)
#
class PensieveMessageLike < ApplicationRecord
  # == Associations
  belongs_to :message, class_name: "PensieveMessage", touch: true
end
