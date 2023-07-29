# typed: true
# frozen_string_literal: true

class ICloudCredentialsPolicy < ApplicationPolicy
  # == Rules
  def index? = false
  def show? = false
end
