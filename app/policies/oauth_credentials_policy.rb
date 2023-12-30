# typed: true
# frozen_string_literal: true

class OAuthCredentialsPolicy < ApplicationPolicy
  # == Rules
  def show? = false
end
