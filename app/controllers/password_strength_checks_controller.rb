# typed: true
# frozen_string_literal: true

class PasswordStrengthChecksController < ApplicationController
  # == Actions
  # POST /password_strength_checks
  def create
    check = PasswordStrengthCheck.new(check_params)
    unless check.valid?
      render(
        json: { errors: check.form_errors },
        status: :unprocessable_entity,
      ) and return
    end
    entropy = T.let(
      checker.calculate_entropy(check.password!).to_f,
      Float,
    )
    strength = [entropy / ::User::MIN_PASSWORD_ENTROPY, 1.0].min
    render(json: { strength: })
  end

  private

  # == Helpers
  sig { returns(ActionController::Parameters) }
  def check_params
    params.require(:check).permit(:password)
  end

  sig { returns(StrongPassword::StrengthChecker) }
  def checker
    @checker ||= T.let(
      StrongPassword::StrengthChecker.new(use_dictionary: true),
      T.nilable(StrongPassword::StrengthChecker),
    )
  end
end
