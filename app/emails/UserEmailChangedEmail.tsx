import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import EmailLayout from "~/components/EmailLayout";

import type { UserEmailChangedEmailQuery } from "~/helpers/graphql";

export type UserEmailChangedEmailProps =
  PagePropsWithData<UserEmailChangedEmailQuery>;

const UserEmailChangedEmail: PageComponent<UserEmailChangedEmailProps> = ({
  data: { user },
}) => {
  invariant(user, "Missing user");
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
