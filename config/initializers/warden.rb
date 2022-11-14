# typed: strict
# frozen_string_literal: true

Warden::Manager.after_set_user do |user, auth, opts|
  scope = opts.fetch(:scope)
  auth.cookies.signed["#{scope}.id"] = user.id
end

Warden::Manager.before_logout do |_, auth, opts|
  scope = opts.fetch(:scope)
  auth.cookies.signed["#{scope}.id"] = nil
end
