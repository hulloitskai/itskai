# typed: strict
# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  extend T::Sig

  # == Configuration ==
  # Configure additional authorization contexts here
  # (`user` is added by default).
  #
  #   authorize :account, optional: true
  #
  # Read more about authorization context: https://actionpolicy.evilmartians.io/#/authorization_context
  authorize :user, optional: true

  # Define common aliases.
  alias_rule :delete?, to: :edit?

  # Always permit owner.
  pre_check :allow_owner!

  # == Default Rules ==
  sig { returns(T::Boolean) }
  def index?
    false
  end

  sig { returns(T::Boolean) }
  def show?
    true
  end

  private

  # == Helpers ==
  sig { void }
  def allow_owner!
    allow! if user&.owner?
  end

  sig { returns(User) }
  def authenticate!
    user or deny!
  end
end
