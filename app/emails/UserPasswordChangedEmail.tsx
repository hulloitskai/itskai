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
      <Text>hi, {name}!</Text>
      <Text>
        we&apos;re contacting you to let you know that your password has been
        changed.
      </Text>
    </>
  );
};

UserPasswordChangedEmail.layout = page => (
  <EmailLayout header="password changed">{page}</EmailLayout>
);

export default UserPasswordChangedEmail;
