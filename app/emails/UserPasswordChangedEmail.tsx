import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserPasswordChangedEmailQuery } from "~/helpers/graphql";
import type { DeepRequired } from "~/helpers/utils";

export type UserPasswordChangedEmailProps = PagePropsWithData<
  DeepRequired<UserPasswordChangedEmailQuery, ["user"]>
>;

const UserPasswordChangedEmail: PageComponent<
  UserPasswordChangedEmailProps
> = ({ data: { user } }) => {
  const { name } = user;
  return (
    <>
      <Text>Hi, {name}!</Text>
      <Text>
        We&apos;re contacting you to let you know that your password has been
        changed.
      </Text>
    </>
  );
};

UserPasswordChangedEmail.layout = buildLayout<UserPasswordChangedEmailProps>(
  page => <EmailLayout header="Password Changed">{page}</EmailLayout>,
);

export default UserPasswordChangedEmail;
