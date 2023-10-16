# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: listening_logs
#
#  id               :uuid             not null, primary key
#  created_at       :datetime         not null
#  spotify_track_id :string           not null
#
# Indexes
#
#  index_listening_logs_on_spotify_track_id  (spotify_track_id)
#
class ListeningLog < ApplicationRecord
  include Identifiable
end
