# typed: true
# frozen_string_literal: true

module Admin
  class NotificationsController < AdminController
    # == Actions
    # GET /admin/notifications
    def index
      scope = authorized_scope(Notification.all)
      pagy, notifications = pagy(
        Notification
          .from(scope, "notifications")
          .includes(:noticeable)
          .order(created_at: :desc, id: :asc),
      )
      render(inertia: "AdminNotificationsPage", props: {
        notifications: NotificationSerializer.many(notifications),
        pagination: pagy_metadata(pagy),
      })
    end
  end
end
