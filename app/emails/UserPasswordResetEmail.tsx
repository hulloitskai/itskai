import { Button, Link, Text } from "~/components/email";
import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

export interface UserPasswordResetEmailProps {
  resetUrl: string;
  user: User;
}

const UserPasswordResetEmail: EmailComponent<UserPasswordResetEmailProps> = ({
  resetUrl,
  user,
}) => {
  const { name } = user;
  return (
    <>
      <Text>hi, {name}!</Text>
      <Text>
        a password change has been requested for your account. if this was you,
        please click the button below to reset your password:
      </Text>
      <Button href={resetUrl} target="_blank">
        reset password
      </Button>
      <Text style={{ marginTop: 14 }}>
        or copy and paste this URL into a new tab of your browser:
      </Text>
      <Link href={resetUrl} target="_blank" style={{ textTransform: "none" }}>
        {resetUrl}
      </Link>
    </>
  );
};

UserPasswordResetEmail.layout = page => (
  <EmailLayout header="reset password">{page}</EmailLayout>
);

export default UserPasswordResetEmail;
