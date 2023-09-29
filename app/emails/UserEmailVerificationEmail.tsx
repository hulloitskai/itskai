import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button } from "@mantine/core";
import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserEmailVerificationEmailQuery } from "~/helpers/graphql";

export type UserEmailVerificationEmailProps =
  PagePropsWithData<UserEmailVerificationEmailQuery> & {
    readonly verificationUrl: string;
  };

const UserVerificationEmail: PageComponent<UserEmailVerificationEmailProps> = ({
  verificationUrl,
  data: { user },
}) => {
  invariant(user, "Missing user");
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text style={{ marginBottom: 10 }}>
        To verify your email address, please click the button below:
      </Text>
      <Button
        component="a"
        href={verificationUrl}
        target="_blank"
        fw={600}
        style={({ white, radius }) => ({
          color: white,
          borderRadius: radius.md,
        })}
      >
        Verify email
      </Button>
      <Text style={{ marginBottom: 6 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Anchor
        href={verificationUrl}
        target="_blank"
        inherit
        style={{ textTransform: "none" }}
      >
        {verificationUrl}
      </Anchor>
    </>
  );
};

UserVerificationEmail.layout = buildLayout<UserEmailVerificationEmailProps>(
  page => <EmailLayout header="Verify email">{page}</EmailLayout>,
);

export default UserVerificationEmail;
