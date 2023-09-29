import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import EmailLayout from "~/components/EmailLayout";

import type { UserWelcomeEmailQuery } from "~/helpers/graphql";

export type UserWelcomeEmailProps = PagePropsWithData<UserWelcomeEmailQuery>;

const UserWelcomeEmail: PageComponent<UserWelcomeEmailProps> = ({
  data: { user },
}) => {
  invariant(user, "Missing user");
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
