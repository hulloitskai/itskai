# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    extend T::Sig

    identified_by :current_user

    sig { void }
    def connect
      self.current_user = find_verified_user
    end

    private

    sig { returns(T.nilable(User)) }
    def find_verified_user
      cookies.signed["user.id"].try! do |id|
        id = T.let(id, String)
        User.find_by(id: id)
      end
    end
  end
end
