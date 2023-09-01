# typed: strict
# frozen_string_literal: true

module AllowsFailedLoads
  extend T::Sig

  private

  # == Helpers
  sig do
    params(error: GraphQL::LoadApplicationObjectFailedError).returns(NilClass)
  end
  def load_application_object_failed(error) = nil
end
