# typed: true
# frozen_string_literal: true

class PasswordStrengthChecksController < ApplicationController
  # == Actions
  def create
    params = check_params
    unless params.valid?
      render(
        json: { errors: params.form_errors },
        status: :unprocessable_entity,
      ) and return
    end
    entropy = T.let(
      checker.calculate_entropy(params.password!).to_f,
      Float,
    )
    strength = [entropy / ::User::MIN_PASSWORD_ENTROPY, 1.0].min
    render(json: { strength: })
  end

  private

  # == Helpers
  sig { returns(PasswordStrengthCheckParams) }
  def check_params
    @check_params ||= PasswordStrengthCheckParams
      .new(params.require(:check).permit!)
  end

  sig { returns(StrongPassword::StrengthChecker) }
  def checker
    @checker ||= T.let(
      StrongPassword::StrengthChecker.new(use_dictionary: true),
      T.nilable(StrongPassword::StrengthChecker),
    )
  end
end
