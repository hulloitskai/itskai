import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button as MantineButton } from "@mantine/core";
import { Button, Text, Link } from "@react-email/components";

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
      <MantineButton
        component={Button}
        href={verificationUrl}
        target="_blank"
        // pX={20}
        // pY={10}
        // bg="brand.7"
        // fw={600}
        // style={({ white, radius }) => ({
        //   color: white,
        //   borderRadius: radius.md,
        // })}
      >
        Verify email
      </MantineButton>
      <Text style={{ marginBottom: 6 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Link
        href={verificationUrl}
        target="_blank"
        style={{ textTransform: "none" }}
      >
        {verificationUrl}
      </Link>
    </>
  );
};

UserVerificationEmail.layout = buildLayout<UserEmailVerificationEmailProps>(
  page => <EmailLayout header="Verify email">{page}</EmailLayout>,
);

export default UserVerificationEmail;
