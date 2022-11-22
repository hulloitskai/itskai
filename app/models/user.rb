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
  # == Concerns ==
  include Identifiable
  include Named

  # == Validations ==
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

  # == Owner ==
  sig { returns(String) }
  def self.owner_email
    ENV.fetch("KAI_LOGIN_EMAIL")
  end

  sig { returns(T.nilable(User)) }
  def self.owner
    User.find_by(email: owner_email)
  end

  sig { returns(User) }
  def self.owner!
    owner or raise ActiveRecord::RecordNotFound
  end

  sig { returns(T::Boolean) }
  def owner?
    email == User.owner_email
  end
end

# == Devise ==
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

  # == Configuration ==
  self.filter_attributes += %i[
    encrypted_password
    reset_password_token
    confirmation_token
    invitation_token
  ]

  # == OmniAuth ==
  sig { params(auth: OmniAuth::AuthHash).returns(User) }
  def self.from_omniauth(auth)
    # rubocop:disable Layout/LineLength
    User.new
    # info = T.let(auth[:info], OmniAuth::AuthHash::InfoHash)
    # user =
    #   scoped do
    #     u =
    #       User
    #         .where(omniauth_provider: auth[:provider], omniauth_uid: auth[:uid])
    #         .or(User.where(email: info[:email]))
    #         .first
    #     T.let(u, T.nilable(User))
    #   end
    # if user.nil?
    #   user =
    #     User.new(
    #       omniauth_provider: auth[:provider],
    #       omniauth_uid: auth[:uid],
    #       **info.slice(:first_name, :last_name, :email),
    #     )
    #   (info[:image] || info[:picture]).try! do |url|
    #     Addressable::URI
    #       .parse(url)
    #       .path
    #       .try! do |path|
    #         path = T.let(path, String)
    #         user.avatar.attach(
    #           io: File.open(url),
    #           filename: File.basename(path),
    #         )
    #       end
    #   end
    #   user.password = Devise.friendly_token
    #   user.skip_confirmation!
    #   user.save!
    # elsif !user.omniauth_provider?
    #   user.update!(
    # omniauth_provider: auth[:provider], omniauth_uid: auth[:uid])
    # end
    # user
    # rubocop:enable Layout/LineLength
  end
end

# == Kai ==
class User
  sig { returns(T.nilable(User)) }
  def self.kai
    email = ENV.fetch("KAI_LOGIN_EMAIL")
    find_by(email: email)
  end

  sig { returns(User) }
  def self.kai!
    T.must(kai)
  end
end
