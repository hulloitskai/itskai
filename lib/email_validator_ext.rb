# typed: strict
# frozen_string_literal: true

require "active_model"
require "email_validator"

# Replace email validator provided by can_has_validations.
ActiveModel::Validations.send(:remove_const, :EmailValidator)
ActiveModel::Validations::EmailValidator = EmailValidator
