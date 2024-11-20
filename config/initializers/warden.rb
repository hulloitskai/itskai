# typed: strict
# frozen_string_literal: true

Warden::Manager.after_set_user do |user|
  user = T.let(user, User)
  crumb = Sentry::Breadcrumb.new(
    category: "auth",
    message: "Authenticated user #{user.id} (#{user.email})",
    level: "info",
  )
  Sentry.add_breadcrumb(crumb)
  # scope = opts.fetch(:scope)
  # auth.cookies.signed["#{scope}.id"] = user.id
end

# Warden::Manager.before_logout do |_, auth, opts|
#   scope = opts.fetch(:scope)
#   auth.cookies.signed["#{scope}.id"] = nil
# end
