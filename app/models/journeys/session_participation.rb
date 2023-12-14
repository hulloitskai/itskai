# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: journeys_session_participations
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
#  index_journeys_session_participations_on_session_id  (session_id)
#
# Foreign Keys
#
#  fk_rails_...  (session_id => journeys_sessions.id)
#
module Journeys
  class SessionParticipation < ApplicationRecord
    include Identifiable

    # == Attributes
    attribute :participant_name, :string, default: -> {
      generate_participant_name
    }

    # == Associations
    belongs_to :session, inverse_of: :participations

    sig { returns(Session) }
    def session!
      session or raise ActiveRecord::RecordNotFound, "missing session"
    end

    # == Validators
    validates :participant_name, :goal, presence: true

    # == Callbacks
    after_destroy :destroy_session_if_empty
    after_commit :trigger_subscriptions, on: %i[create update destroy]

    # == Methods
    sig { returns(String) }
    def self.generate_participant_name
      animal_name = Faker::Creature::Animal.name
      "anonymous #{animal_name}"
    end

    private

    # == Callback Handlers
    sig { void }
    def destroy_session_if_empty
      session = session!
      session.destroy if session.participations.reload.empty?
    end

    sig { void }
    def trigger_subscriptions
      Schema.subscriptions!.trigger(
        :journeys_session_participation,
        { session_id: session!.to_gid.to_s },
        self,
      )
    end
  end
end
