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

  sig { returns(T.nilable(T.any(User, Symbol))) }
  def user = super

  # == Pre-checks
  pre_check :allow_system!
  pre_check :allow_owner!

  # == Rules
  undef_method :create?

  sig { returns(T::Boolean) }
  def index? = true

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
  sig { returns(T.nilable(User)) }
  def active_user
    user = self.user
    user if user.is_a?(User)
  end

  sig { returns(T::Boolean) }
  def system_user?
    user == :system
  end

  sig { void }
  def allow_system!
    allow! if system_user?
  end

  sig { void }
  def allow_owner!
    allow! if active_user&.owner?
  end

  sig { returns(User) }
  def authenticate!
    active_user or deny!
  end
end
