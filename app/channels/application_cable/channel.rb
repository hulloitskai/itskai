# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Channel < ActionCable::Channel::Base
    extend T::Sig
    extend T::Helpers

    # == Methods
    sig { params(message: String).returns(TrueClass) }
    def reject_with(message)
      transmit({ error: message })
      reject
    end

    sig { returns(T.all(Object, GlobalID::Identification)) }
    def identity
      (current_user || connection_identity) or
        raise "Missing connection identifiers"
    end
  end
end
