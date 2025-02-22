import {
  type ExplorationCommentNotificationPayload,
  type FriendVibecheckNotificationPayload,
  type LocationAccessNotificationPayload,
  type Notification,
  type StatusNotificationPayload,
} from "~/types";

import routes from "./routes";

export const DEFAULT_NOTIFICATION_ICON_URL = "/logo.png";

export interface RenderedNotification
  extends Pick<NotificationOptions, "body"> {
  title: string;
}

export const renderNotification = (
  notification: Notification,
): RenderedNotification => {
  switch (notification.type) {
    case "ExplorationComment": {
      const { exploration_label, message_snippet } =
        notification.payload as ExplorationCommentNotificationPayload;
      return {
        title: `New comment on "${exploration_label}"`,
        body: message_snippet,
      };
    }
    case "FriendVibecheck": {
      const { friend_emoji, friend_name, vibe } =
        notification.payload as FriendVibecheckNotificationPayload;
      return {
        title: `${friend_emoji} ${friend_name} sent their vibe`,
        body: `${friend_name} is feeling ${vibe}`,
      };
    }
    case "LocationAccess": {
      const { accessor, password } =
        notification.payload as LocationAccessNotificationPayload;
      return {
        title: "Your location was accessed",
        body: `${accessor} (pw: ${password}) accessed your location`,
      };
    }
    case "Status": {
      const { emoji, text_snippet } =
        notification.payload as StatusNotificationPayload;
      return {
        title: "Kai shared with you",
        body: [emoji, text_snippet].filter(Boolean).join(" "),
      };
    }
    default:
      throw new Error(`Unknown notification type: ${notification.type}`);
  }
};

export const notificationActionUrl = (notification: Notification): string => {
  switch (notification.type) {
    case "ExplorationComment":
      return routes.adminExplorationComments.index.path();
    case "Status": {
      const { friend_token } =
        notification.payload as StatusNotificationPayload;
      return routes.friends.show.path({ query: { friend_token } });
    }
    default:
      return routes.adminNotifications.index.path();
  }
};
