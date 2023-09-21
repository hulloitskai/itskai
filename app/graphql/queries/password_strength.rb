# typed: strict
# frozen_string_literal: true

module Queries
  class PasswordStrength < BaseQuery
    # == Type
    type Float, null: false

    # == Arguments
    argument :password, String

    # == Resolver
    sig { params(password: String).returns(Float) }
    def resolve(password:)
      entropy = T.let(checker.calculate_entropy(password).to_f, Float)
      [entropy / ::User::MIN_PASSWORD_ENTROPY, 1.0].min
    end

    private

    # == Helpers
    sig { returns(StrongPassword::StrengthChecker) }
    def checker
      @checker ||= T.let(
        StrongPassword::StrengthChecker.new(use_dictionary: true),
        T.nilable(StrongPassword::StrengthChecker),
      )
    end
  end
end
