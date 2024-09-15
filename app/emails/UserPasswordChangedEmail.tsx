import { Text } from "~/components/email";
import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

export interface UserPasswordChangedEmailProps {
  user: User;
}

const UserPasswordChangedEmail: EmailComponent<
  UserPasswordChangedEmailProps
> = ({ user }) => {
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>
        We&apos;re contacting you to let you know that your password has been
        changed.
      </Text>
    </>
  );
};

UserPasswordChangedEmail.layout = page => (
  <EmailLayout header="Password changed">{page}</EmailLayout>
);

export default UserPasswordChangedEmail;
