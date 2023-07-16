# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    extend T::Sig
    extend T::Helpers

    # == Configuration
    identified_by :current_user

    # == Connection
    sig { void }
    def connect
      self.current_user = find_verified_user
    end

    private

    # == Helpers
    sig { returns(T.nilable(User)) }
    def find_verified_user
      if (id = cookies.signed["user.id"])
        User.find_by(id:)
      end
    end
  end
end
