import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button } from "@mantine/core";
import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserPasswordResetEmailQuery } from "~/helpers/graphql";

export type UserPasswordResetEmailProps =
  PagePropsWithData<UserPasswordResetEmailQuery> & {
    readonly resetUrl: string;
  };

const UserPasswordResetEmail: PageComponent<UserPasswordResetEmailProps> = ({
  resetUrl,
  data: { user },
}) => {
  invariant(user, "Missing user");
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text style={{ marginBottom: 10 }}>
        A password change has been requested for your account. If this was you,
        please click the button below to reset your password:
      </Text>
      <Button component="a" href={resetUrl} target="_blank">
        Reset password
      </Button>
      <Text style={{ marginBottom: 6 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Anchor href={resetUrl} target="_blank" style={{ textTransform: "none" }}>
        {resetUrl}
      </Anchor>
    </>
  );
};

UserPasswordResetEmail.layout = buildLayout<UserPasswordResetEmailProps>(
  page => <EmailLayout header="Reset password">{page}</EmailLayout>,
);

export default UserPasswordResetEmail;
