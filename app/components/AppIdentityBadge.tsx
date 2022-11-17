import type { FC } from "react";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppIdentityBadgeProps = {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppIdentityBadge: FC<AppIdentityBadgeProps> = ({ viewer }) => {
  const router = useRouter();
  return (
    <Tooltip
      label="You're signed in! Click to sign out."
      disabled={!viewer}
      withArrow
    >
      <Badge
        variant="dot"
        color={viewer ? "indigo" : "gray.4"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          if (viewer) {
            router.delete("/account/sign_out");
          } else {
            router.visit("/account/sign_in");
          }
        }}
      >
        {viewer ? viewer.name : "Sign In"}
      </Badge>
    </Tooltip>
  );
};

export default AppIdentityBadge;
