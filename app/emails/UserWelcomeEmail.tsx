import type { PageComponent } from "~/helpers/inertia";
import type { SharedPageProps, User } from "~/types";
import { Text } from "~/components/email";

import EmailLayout from "~/components/EmailLayout";

export interface UserWelcomeEmailProps extends SharedPageProps {
  user: User;
}

const UserWelcomeEmail: PageComponent<UserWelcomeEmailProps> = ({ user }) => {
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>
        Thanks for registering for an account on my website.
        <br />
        I&apos;ll keep you posted when there&apos;s more stuff you can do on
        here :)
      </Text>
    </>
  );
};

UserWelcomeEmail.layout = buildLayout<UserWelcomeEmailProps>(page => (
  <EmailLayout header="Welcome!!!">{page}</EmailLayout>
));

export default UserWelcomeEmail;
