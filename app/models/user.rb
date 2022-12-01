# typed: strict
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
  # == Concerns
  include Identifiable
  include Named

  # == Validations
  validates :name, presence: true, length: { maximum: 64 }
  validates :email,
            presence: true,
            length: {
              maximum: 100,
            },
            email: true,
            uniqueness: {
              case_sensitive: false,
            }

  # == Owner
  sig { returns(String) }
  def self.owner_email
    unless defined?(@owner_email)
      @owner_email = T.let(ENV.fetch("OWNER_LOGIN_EMAIL"), T.nilable(String))
      raise "Owner login email must not be blank" if @owner_email.blank?
    end
    T.must(@owner_email)
  end

  sig { returns(T.nilable(User)) }
  def self.owner
    find_by(email: owner_email)
  end

  sig { returns(User) }
  def self.owner!
    owner or raise ActiveRecord::RecordNotFound
  end

  sig { returns(T::Boolean) }
  def owner?
    email == User.owner_email
  end

  # == Honeybadger
  sig { returns(T::Hash[String, T.untyped]) }
  def honeybadger_context
    { "user_id" => id, "user_email" => email }
  end

  # == FullStory
  sig { returns(T::Hash[String, T.untyped]) }
  def fullstory_identity
    { "uid" => id, "email" => email, "displayName" => name }
  end
end

# == Devise
class User
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

  # == Configuration
  self.filter_attributes += %i[
    encrypted_password
    reset_password_token
    confirmation_token
    invitation_token
  ]
end
