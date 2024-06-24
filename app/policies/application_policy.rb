# typed: strict
# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  extend T::Sig
  extend T::Helpers

  # == Context
  # Configure additional authorization contexts here
  # (`user` is added by default).
  #
  #   authorize :account, optional: true
  #
  # Read more about authorization context: https://actionpolicy.evilmartians.io/#/authorization_context
  authorize :user, allow_nil: true

  # == Pre-checks
  pre_check :allow_owner!

  # == Rules
  undef_method :create?

  sig { returns(T::Boolean) }
  def index? = false

  sig { returns(T::Boolean) }
  def show? = true

  sig { returns(T::Boolean) }
  def administrate? = false

  # == Aliases
  alias_rule :edit?, to: :manage?

  # == Scopes
  relation_scope { |relation| relation }

  private

  # == Helpers
  sig { void }
  def allow_owners!
    allow! if user&.owner?
  end

  sig { returns(User) }
  def authenticate!
    user or deny!
  end
end
