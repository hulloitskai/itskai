import type { FC } from "react";

import { RequestUserEmailVerificationMutationDocument } from "~/helpers/graphql";

export type UserRequestEmailVerificationPageFormValues = {
  readonly email: string;
};

export type UserRequestEmailVerificationPageFormProps = {};

const UserRequestEmailVerificationPageForm: FC<
  UserRequestEmailVerificationPageFormProps
> = () => {
  const router = useRouter();

  // == Form
  const { getInputProps, isDirty, onSubmit } =
    useForm<UserRequestEmailVerificationPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Email Request
  const onRequestEmailError = useApolloAlertCallback(
    "Failed to request new verification email",
  );
  const [requestEmail, { loading: requestingEmail }] = useMutation(
    RequestUserEmailVerificationMutationDocument,
    {
      onCompleted: () => {
        router.visit("/login", {
          onSuccess: () => {
            showNotice({
              title: "Verification email re-sent",
              message:
                "Please check your email and follow the link to verify " +
                "your new email address.",
            });
          },
        });
      },
      onError: onRequestEmailError,
    },
  );

  return (
    <form
      onSubmit={onSubmit(({ email }) => {
        requestEmail({
          variables: {
            input: {
              email,
            },
          },
        });
      })}
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
    </form>
  );
};

export default UserRequestEmailVerificationPageForm;
