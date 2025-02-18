# typed: true
# frozen_string_literal: true

class PasswordStrengthChecksController < ApplicationController
  # == Actions
  # POST /password_strength_checks
  def create
    check_params = params.expect(check: [:password])
    check = PasswordStrengthCheck.new(check_params)
    unless check.valid?
      render(
        json: { errors: check.form_errors },
        status: :unprocessable_entity,
      ) and return
    end

    checker = StrongPassword::StrengthChecker.new(use_dictionary: true)
    entropy = T.let(
      checker.calculate_entropy(check.password!).to_f,
      Float,
    )
    strength = [entropy / ::User::MIN_PASSWORD_ENTROPY, 1.0].min
    render(json: { strength: })
  end
end
