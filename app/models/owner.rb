# typed: strict
# frozen_string_literal: true

module Owner
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def email
      ENV["OWNER_EMAIL"]
    end

    sig { returns(String) }
    def email!
      email or raise "Owner email not set"
    end

    sig { returns(T.nilable(String)) }
    def phone
      ENV["OWNER_PHONE"]
    end

    sig { returns(String) }
    def phone!
      phone or raise "Owner phone number not set"
    end

    # == Current
    sig { returns(T.nilable(User)) }
    def current
      User.find_by(email: email!)
    end
  end
end
