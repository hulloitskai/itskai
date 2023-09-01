import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@react-email/components";

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

UserWelcomeEmail.layout = buildLayout<UserWelcomeEmailProps>(page => (
  <EmailLayout header="welcome!!!">{page}</EmailLayout>
));

export default UserWelcomeEmail;
