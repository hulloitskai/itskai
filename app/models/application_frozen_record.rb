# typed: strict
# frozen_string_literal: true

class ApplicationFrozenRecord < FrozenRecord::Base
  extend T::Sig
  extend T::Helpers
  include GlobalID::Identification

  # == Constants
  GeneratedRelationMethods = FrozenRecord::Scope

  # == Configuration
  self.abstract_class = true
  self.base_path = Rails.root.join("config/records")
end
