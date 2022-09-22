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

  # Define scope matchers.
  scope_matcher :active_record_relation,
                ->(target) { target < ActiveRecord::Base }

  # # Always permit admins.
  # # pre_check :allow_admins!

  # private

  # sig { void }
  # def allow_admins!
  #   allow! if user&.admin?
  # end

  # sig { returns(User) }
  # def authenticate!
  #   user = self.user
  #   deny! if user.nil?
  #   T.must(user)
  # end
end
