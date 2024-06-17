# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    extend T::Sig
    extend T::Helpers

    # == Configuration
    identified_by :current_user, :connection_identity

    # == Connection
    sig { void }
    def connect
      unless (self.current_user = find_verified_user)
        self.connection_identity = ConnectionIdentity.new
      end
    end

    # # == Methods
    # sig { returns(ActionDispatch::Request) }
    # def request = super

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
