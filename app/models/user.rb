# typed: strict
# frozen_string_literal: true

require "owner"

# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           not null
#  encrypted_password     :string           not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  name                   :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  include Identifiable
  include ::Named

  # == Constants
  MIN_PASSWORD_ENTROPY = 14

  # == Devise
  # Others modules are: :lockable, :timeoutable, and :omniauthable.
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :trackable,
         :omniauthable,
         reconfirmable: true

  self.filter_attributes += %i[
    encrypted_password
    reset_password_token
    confirmation_token
    invitation_token
  ]

  # == Attributes
  sig { returns(String) }
  def email_with_name
    ActionMailer::Base.email_address_with_name(email, name)
  end

  # == Attachments
  has_one_attached :avatar

  # == Validations
  validates :name, length: { minimum: 2 }
  validates :email,
            presence: true,
            length: { maximum: 100 },
            email: true,
            uniqueness: { case_sensitive: false }
  validates :password,
            password_strength: {
              min_entropy: MIN_PASSWORD_ENTROPY,
              use_dictionary: true,
            },
            allow_nil: true

  # == Callbacks
  before_validation :remove_unconfirmed_email_if_matches_email,
                    if: %i[unconfirmed_email? email_changed?]

  # == Finders
  sig { returns(T.nilable(User)) }
  def self.owner
    if (email = Owner.email)
      User.find_by(email:)
    end
  end

  sig { returns(User) }
  def self.owner!
    User.find_by!(email: Owner.email!)
  end

  # == Emails
  sig { void }
  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later
  end

  # == Sentry
  sig { returns(T::Hash[String, T.untyped]) }
  def sentry_info
    { "id" => to_gid.to_s, "email" => email }
  end

  # == Fullstory
  sig { returns(T::Hash[String, T.untyped]) }
  def fullstory_identity
    { "uid" => to_gid.to_s, "email" => email, "displayName" => name }
  end

  # == Devise
  sig do
    params(
      params: T::Hash[Symbol, T.untyped],
      options: T.untyped,
    ).returns(T::Boolean)
  end
  def update_without_password(params, *options)
    params.delete(:email)
    super(params)
  end

  # == Methods
  sig { returns(T::Boolean) }
  def owner?
    email == Owner.email!
  end

  protected

  # == Callback Handlers
  sig { void }
  def after_confirmation
    super
    send_welcome_email if confirmed_at_previously_was.nil?
  end

  private

  # == Callback Handlers
  sig { void }
  def remove_unconfirmed_email_if_matches_email
    self.unconfirmed_email = nil if email == unconfirmed_email
  end
end
