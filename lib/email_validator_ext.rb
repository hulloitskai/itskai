# typed: ignore
# frozen_string_literal: true

EmailValidator.default_options[:mode] = :strict

# Replace email validator provided by can_has_validations.
ActiveModel::Validations.send(:remove_const, :EmailValidator)
ActiveModel::Validations::EmailValidator = EmailValidator
