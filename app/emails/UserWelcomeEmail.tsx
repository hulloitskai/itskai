import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserWelcomeEmailQuery } from "~/helpers/graphql";
import type { DeepRequired } from "~/helpers/utils";

export type UserWelcomeEmailProps = PagePropsWithData<
  DeepRequired<UserWelcomeEmailQuery, ["user"]>
>;

const UserWelcomeEmail: PageComponent<UserWelcomeEmailProps> = ({
  data: { user },
}) => {
  return (
    <>
      <Text>Hi, {user.name}!</Text>
      <Text>
        Thanks for registering for an account on my website :)
        <br />
        I&apos;ll keep you posted when there&apos; stuff we can do together.
      </Text>
    </>
  );
};

UserWelcomeEmail.layout = buildLayout<UserWelcomeEmailProps>(page => (
  <EmailLayout header="Welcome to It's Kai!">{page}</EmailLayout>
));

export default UserWelcomeEmail;
