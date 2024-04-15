import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button, Text, Link } from "~/components/email";

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
      <Text mb={10}>
        To verify your email address, please click the button below:
      </Text>
      <Button href={verificationUrl} target="_blank" fw={600}>
        Verify email
      </Button>
      <Space h="lg" />
      <Text mb={4}>
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
