# typed: true
# frozen_string_literal: true

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
  # == Configuration
  MIN_PASSWORD_ENTROPY = T.let(14, Integer)

  # == Attributes
  include Identifiable
  include ::Named

  sig { returns(String) }
  def email_with_name
    ActionMailer::Base.email_address_with_name(email, name)
  end

  sig { override.params(value: String).returns(String) }
  def email=(value)
    self.unconfirmed_email = nil if value == email && unconfirmed_email?
    super(value)
  end

  # == Attachments
  has_one_attached :avatar

  # == Validations
  validates :name, presence: true, length: { maximum: 64, minimum: 2 }
  validates :email,
            presence: true,
            length: {
              maximum: 100,
            },
            email: true,
            uniqueness: {
              case_sensitive: false,
            }
  validates :password,
            password_strength: {
              min_entropy: MIN_PASSWORD_ENTROPY,
              use_dictionary: true,
            },
            allow_nil: true

  # == Emails
  sig { void }
  def send_welcome_email
    UserMailer.welcome_email(self).deliver_later
  end

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

  # == Ownership
  class << self
    sig { returns(String) }
    def owner_email
      return @owner_email if defined?(@owner_email)
      @owner_email = ENV.fetch("OWNER_LOGIN_EMAIL")
    end

    sig { returns(T.nilable(User)) }
    def owner = find_by(email: owner_email)

    sig { returns(User) }
    def owner!
      owner or raise ActiveRecord::RecordNotFound, "Missing owner"
    end
  end

  sig { returns(T::Boolean) }
  def owner?
    email == User.owner_email
  end

  # == Methods: Sentry
  sig { returns(T::Hash[String, T.untyped]) }
  def sentry_info
    { "id" => id, "email" => email }
  end

  # == Methods: Fullstory
  sig { returns(T::Hash[String, T.untyped]) }
  def fullstory_identity
    { "uid" => id, "email" => email, "displayName" => name }
  end

  protected

  # == Callback Handlers
  sig { void }
  def after_confirmation
    super
    send_welcome_email if confirmed_at_previously_was.nil?
  end
end
