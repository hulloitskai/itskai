# typed: true
# frozen_string_literal: true

class StatusNotificationPayload < T::Struct
  # == Properties
  const :status, Status
  delegate_missing_to :status

  const :friend, Friend
  delegate :token, to: :friend, prefix: true
end
