# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: eventqr_events
#
#  id            :uuid             not null, primary key
#  end           :datetime         not null
#  inviter_email :string           not null
#  inviter_name  :string
#  slug          :string           not null
#  start         :datetime         not null
#  title         :string           not null
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_eventqr_events_on_inviter_email  (inviter_email)
#  index_eventqr_events_on_uid            (uid) UNIQUE
#
module Eventqr
  class Event < ApplicationRecord
    include Identifiable
    include FriendlyIdentifiable
    include Slugged

    # == Configuration
    self.generated_slug_length = 12
    friendly_id :slug

    # == Attributes
    attribute :slug, default: -> { generate_slug }

    # == Attributes
    sig { params(value: T.nilable(String)).returns(T.nilable(String)) }
    def inviter_name=(value)
      super(value&.strip.presence)
    end

    # == Attachments
    has_one_attached :invite
    has_one_attached :qr_code

    sig { returns(ActiveStorage::Blob) }
    def invite_blob!
      invite_blob or raise ActiveRecord::RecordNotFound
    end

    sig { returns(ActiveStorage::Blob) }
    def qr_code_blob!
      qr_code_blob or raise ActiveRecord::RecordNotFound
    end

    # == Validations
    validates :inviter_email, presence: true, email: true
    validates :uid, presence: true, uniqueness: true
    validates :title, presence: true
    validates :start, :end, presence: true

    # == Callbacks
    after_create_commit :generate_qr_code_later
    after_update_commit :send_qr_code_generated_email

    # == Constructors
    sig do
      params(
        io: IO,
        filename: String,
        inviter_email: String,
        inviter_name: T.nilable(String),
      ).returns(Event)
    end
    def self.create_from_file!(
      io:,
      filename:,
      inviter_email:,
      inviter_name: nil
    )
      events = T.let(Icalendar::Event.parse(io).tap { io.rewind },
                     T::Array[Icalendar::Event])
      event = events.first or raise "No events found"
      find_or_initialize_by(uid: event.uid.value) do |e|
        e.update!(
          inviter_email:,
          inviter_name:,
          title: event.summary.value,
          start: event.dtstart.value,
          end: event.dtend.value,
          invite: {
            io:,
            filename:,
          },
        )
      end
    end

    # == Jobs
    sig { returns(ActiveStorage::Blob) }
    def generate_qr_code
      EventGenerateQrCodeImageJob.perform_now(self)
    end

    sig { void }
    def generate_qr_code_later
      EventGenerateQrCodeImageJob.perform_later(self)
    end

    # == Emails
    sig { returns(ActionMailer::MessageDelivery) }
    def qr_code_generated_email
      EventMailer.qr_code_generated_email(self)
    end

    # == Methods
    sig { returns(String) }
    def inviter_email_with_name
      ActionMailer::Base.email_address_with_name(inviter_email, inviter_name)
    end

    sig { returns(T.nilable(String)) }
    def qr_code_image_url
      qr_code_blob.try! do |blob|
        blob = T.let(blob, ActiveStorage::Blob)
        polymorphic_url(blob)
      end
    end

    private

    # == Callbacks
    sig { void }
    def send_qr_code_generated_email
      attachment_changes["qr_code"].try! do |change|
        if change.is_a?(ActiveStorage::Attached::Changes::CreateOne)
          qr_code_generated_email.deliver_later
        end
      end
    end
  end
end
