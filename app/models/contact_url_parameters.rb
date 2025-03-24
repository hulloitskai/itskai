# typed: true
# frozen_string_literal: true

class ContactUrlParameters < ApplicationParameters
  # == Attributes
  attribute :subject, :string
  attribute :body, :string

  # == Methods
  sig { returns(T.nilable(T::Hash[Symbol, String])) }
  def mailto_params
    { subject:, body: }.compact_blank.presence
  end

  sig { returns(T.nilable(T::Hash[Symbol, String])) }
  def sms_params
    { body: }.compact_blank.presence
  end
end
