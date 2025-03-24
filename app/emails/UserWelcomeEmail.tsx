import { Text } from "~/components/email";
import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

export interface UserWelcomeEmailProps {
  user: User;
}

const UserWelcomeEmail: EmailComponent<UserWelcomeEmailProps> = ({ user }) => {
  const { name } = user;
  return (
    <>
      <Text>hi, {name}!</Text>
      <Text>
        thanks for registering for an account on my website.
        <br />
        i&apos;ll keep you posted when there&apos;s more stuff you can do on
        here :)
      </Text>
    </>
  );
};

UserWelcomeEmail.layout = page => (
  <EmailLayout header="welcome!!!">{page}</EmailLayout>
);

export default UserWelcomeEmail;
