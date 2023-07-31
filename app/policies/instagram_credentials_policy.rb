# typed: true
# frozen_string_literal: true

class InstagramCredentialsPolicy < ApplicationPolicy
  # == Rules
  def index? = false
  def show? = false
end
