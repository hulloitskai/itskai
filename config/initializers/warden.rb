# typed: true
# frozen_string_literal: true

Warden::Manager.after_set_user do |user|
  user = T.let(user, User)
  crumb = Sentry::Breadcrumb.new(
    category: "auth",
    message: "Authenticated user #{user.id} (#{user.email})",
    level: "info",
  )
  Sentry.add_breadcrumb(crumb)
end
