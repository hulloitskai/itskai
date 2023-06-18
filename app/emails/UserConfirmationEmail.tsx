import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Button, Text, Link } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { UserConfirmationEmailQuery } from "~/helpers/graphql";
import type { DeepRequired } from "~/helpers/utils";

export type UserConfirmationEmailProps = PagePropsWithData<
  DeepRequired<UserConfirmationEmailQuery, ["user"]>
> & {
  readonly confirmationUrl: string;
};

const UserConfirmationEmail: PageComponent<UserConfirmationEmailProps> = ({
  data: { user },
  confirmationUrl,
}) => {
  return (
    <>
      <Text>Hi, {user.name}!</Text>
      <Text style={{ marginBottom: 10 }}>
        To verify your email address, please click the button below:
      </Text>
      <Box
        component={Button}
        href={confirmationUrl}
        target="_blank"
        pX={20}
        pY={10}
        bg="brand"
        fw={600}
        sx={({ white, radius }) => ({
          color: white,
          borderRadius: radius.sm,
        })}
      >
        Verify
      </Box>
      <Text style={{ marginBottom: 6 }}>
        Or copy and paste this URL into a new tab of your browser:
      </Text>
      <Link href={confirmationUrl} target="_blank">
        {confirmationUrl}
      </Link>
    </>
  );
};

UserConfirmationEmail.layout = buildLayout<UserConfirmationEmailProps>(page => (
  <EmailLayout header="Verify Your Email">{page}</EmailLayout>
));

export default UserConfirmationEmail;
