# typed: true
# frozen_string_literal: true

module Admin
  class NotificationsController < AdminController
    # == Actions
    # GET /admin/notifications
    def index
      scope = authorized_scope(Notification.for_owner)
      pagy, notifications = pagy(
        Notification.from(scope, Notification.table_name)
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
