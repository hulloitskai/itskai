import type { EmailComponent } from "~/helpers/inertia";
import type { User } from "~/types";
import { Button, Link, Text } from "~/components/email";

import EmailLayout from "~/components/EmailLayout";

export interface UserEmailVerificationEmailProps {
  verificationUrl: string;
  user: User;
}

const UserVerificationEmail: EmailComponent<
  UserEmailVerificationEmailProps
> = ({ verificationUrl, user }) => {
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>To verify your email address, please click the button below:</Text>
      <Button href={verificationUrl}>Verify email</Button>
      <Text style={{ marginTop: 14 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Link
        className="link"
        href={verificationUrl}
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
