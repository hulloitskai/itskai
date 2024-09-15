import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

export interface UserEmailChangedEmailProps {
  user: User;
}

const UserEmailChangedEmail: EmailComponent<UserEmailChangedEmailProps> = ({
  user,
}) => {
  const { email, name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>
        We&apos;re contacting you to let you know that your email has been
        changed to <Anchor href={`mailto:${name}%20<${email}>`}>{email}</Anchor>
        .
      </Text>
    </>
  );
};

UserEmailChangedEmail.layout = page => (
  <EmailLayout header="Email changed">{page}</EmailLayout>
);

export default UserEmailChangedEmail;
