# typed: true
# frozen_string_literal: true

class StatusSerializer < ApplicationSerializer
  # == Configuration
  object_as :checker, model: "Healthcheck::Checker"

  # == Attributes
  attribute :status, type: :string do
    checker.errored? ? "error" : "ok"
  end
  attributes errors: { type: :"any[]" }
  attribute :booted_at, type: :string do
    ItsKai.application.booted_at
  end
end
