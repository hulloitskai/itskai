# typed: true
# frozen_string_literal: true

class OAuthCredentialsPolicy < ApplicationPolicy
  # == Rules
  def index? = false
  def show? = false
end
