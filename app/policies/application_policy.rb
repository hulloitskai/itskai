# typed: true
# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  extend T::Sig

  # == Context
  # Configure additional authorization contexts here
  # (`user` is added by default).
  #
  #   authorize :account, optional: true
  #
  # Read more about authorization context: https://actionpolicy.evilmartians.io/#/authorization_context
  authorize :user, optional: true

  sig { returns(T.nilable(User)) }
  def user
    super
  end

  # == Pre-checks
  pre_check :allow_owner!

  # == Aliases
  alias_rule :edit?, to: :update?
  alias_rule :delete?, to: :destroy?
  alias_rule :destroy?, to: :update?

  # == Rules
  sig { returns(T::Boolean) }
  def show?
    true
  end

  # == Scopes
  relation_scope { |relation| relation }

  private

  # == Helpers
  sig { void }
  def allow_owner!
    allow! if user&.owner?
  end

  sig { returns(User) }
  def authenticate!
    user or deny!
  end
end
