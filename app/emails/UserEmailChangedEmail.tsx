import type { PageComponent } from "~/helpers/inertia";
import type { SharedPageProps, User } from "~/types";
import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

export interface UserEmailChangedEmailProps extends SharedPageProps {
  user: User;
}

const UserEmailChangedEmail: PageComponent<UserEmailChangedEmailProps> = ({
  user,
}) => {
  const { name, email } = user;
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

UserEmailChangedEmail.layout = buildLayout<UserEmailChangedEmailProps>(page => (
  <EmailLayout header="Email changed">{page}</EmailLayout>
));

export default UserEmailChangedEmail;
