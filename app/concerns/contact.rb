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
  end
end
