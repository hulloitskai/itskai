# typed: true
# frozen_string_literal: true

class HealthcheckSerializer < ApplicationSerializer
  # == Configuration
  object_as :checker, model: "Healthcheck::Checker"

  # == Attributes
  attribute :status, type: :string do
    checker.errored? ? "error" : "ok"
  end
  attributes errors: { type: :"any[]" }
end
