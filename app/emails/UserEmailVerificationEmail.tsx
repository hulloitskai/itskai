import { Button, Link, Text } from "~/components/email";
import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

export interface UserEmailVerificationEmailProps {
  verificationUrl: string;
  user: User;
}

const UserVerificationEmail: EmailComponent<
  UserEmailVerificationEmailProps
> = ({ user, verificationUrl }) => {
  const { name } = user;
  return (
    <>
      <Text>hi, {name}!</Text>
      <Text>to verify your email address, please click the button below:</Text>
      <Button href={verificationUrl}>verify email</Button>
      <Text style={{ marginTop: 14 }}>
        or copy and paste this URL into a new tab of your browser:
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

UserVerificationEmail.layout = page => (
  <EmailLayout header="verify email">{page}</EmailLayout>
);

export default UserVerificationEmail;
