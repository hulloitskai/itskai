import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text, Link } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserEmailChangedEmailQuery } from "~/helpers/graphql";

export type UserEmailChangedEmailProps =
  PagePropsWithData<UserEmailChangedEmailQuery>;

const UserEmailChangedEmail: PageComponent<UserEmailChangedEmailProps> = ({
  data: { user },
}) => {
  invariant(user, "Missing user");
  const { name, email } = user;

  // == Markup
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>
        We&apos;re contacting you to let you know that your email has been
        changed to <Link href={`mailto:${name}%20<${email}>`}>{email}</Link>.
      </Text>
    </>
  );
};

UserEmailChangedEmail.layout = buildLayout<UserEmailChangedEmailProps>(page => (
  <EmailLayout header="Email Changed">{page}</EmailLayout>
));

export default UserEmailChangedEmail;
