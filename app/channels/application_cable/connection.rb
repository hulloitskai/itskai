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

    private

    # == Helpers
    sig { returns(T.nilable(User)) }
    def find_verified_user
      env["warden"].user
    end
  end
end
