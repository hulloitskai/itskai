# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: journey_session_participations
#
#  id               :uuid             not null, primary key
#  goal             :text             not null
#  participant_name :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  participant_id   :uuid             not null
#  session_id       :uuid             not null
#
# Indexes
#
#  index_journey_session_participations_on_session_id  (session_id)
#
# Foreign Keys
#
#  fk_rails_...  (session_id => journey_sessions.id)
#
module Journey
  class SessionParticipation < ApplicationRecord
    # == Associations
    belongs_to :session, inverse_of: :participations

    sig { returns(Journey::Session) }
    def session!
      session or raise ActiveRecord::RecordNotFound, "missing session"
    end

    # == Callbacks
    after_commit :trigger_subscriptions, on: %i[create update]

    private

    # == Callback Handlers
    sig { void }
    def trigger_subscriptions
      Schema.subscriptions!.trigger(
        :journey_session_participation,
        { session_id: session!.to_gid.to_s },
        self,
      )
    end
  end
end
