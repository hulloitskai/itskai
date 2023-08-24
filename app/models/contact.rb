# typed: true
# frozen_string_literal: true

module Contact
  class << self
    extend T::Sig

    # == Methods
    sig { returns(T.nilable(String)) }
    def email
      ENV["CONTACT_EMAIL"]
    end

    sig { returns(String) }
    def email!
      email or raise "Contact email not set"
    end
  end
end
