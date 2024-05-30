import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button, Text, Link } from "~/components/email";

import EmailLayout from "~/components/EmailLayout";

import type { UserPasswordResetEmailQuery } from "~/helpers/graphql";

export type UserPasswordResetEmailProps =
  PagePropsWithData<UserPasswordResetEmailQuery> & {
    resetUrl: string;
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
      <Text>
        A password change has been requested for your account. If this was you,
        please click the button below to reset your password:
      </Text>
      <Button href={resetUrl} target="_blank">
        Reset password
      </Button>
      <Text style={{ marginTop: 14 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Link href={resetUrl} target="_blank" style={{ textTransform: "none" }}>
        {resetUrl}
      </Link>
    </>
  );
};

UserPasswordResetEmail.layout = buildLayout<UserPasswordResetEmailProps>(
  page => <EmailLayout header="Reset password">{page}</EmailLayout>,
);

export default UserPasswordResetEmail;
