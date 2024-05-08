import { BoxProps } from "@mantine/core";
import type { FC } from "react";

import { RequestUserPasswordResetMutationDocument } from "~/helpers/graphql";

export type UserRequestPasswordResetPageFormValues = {
  readonly email: string;
};

export type UserRequestPasswordResetPageFormProps = BoxProps;

const UserRequestPasswordResetPageForm: FC<
  UserRequestPasswordResetPageFormProps
> = ({ ...otherProps }) => {
  const router = useRouter();

  // == Form
  const { getInputProps, isDirty, onSubmit } =
    useForm<UserRequestPasswordResetPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Requesting Email
  const onRequestEmailError = useApolloAlertCallback(
    "Failed to request password reset email",
  );
  const [requestEmail, { loading: requestingEmail }] = useMutation(
    RequestUserPasswordResetMutationDocument,
    {
      onCompleted: () => {
        router.visit("/login", {
          onSuccess: () => {
            showNotice({
              title: "Password reset email sent",
              message:
                "Please check your email and follow the link to reset " +
                "your password.",
            });
          },
        });
      },
      onError: onRequestEmailError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(({ email }) => {
        requestEmail({
          variables: {
            input: {
              email,
            },
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <TextInput
          label="Email"
          placeholder="friend@example.com"
          required
          {...getInputProps("email")}
        />
        <Button type="submit" disabled={!isDirty()} loading={requestingEmail}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default UserRequestPasswordResetPageForm;
