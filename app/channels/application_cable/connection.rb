# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    extend T::Sig

    identified_by :current_user

    sig { void }
    def connect
      # self.current_user = Session.for(request)&.user
    end
  end
end
