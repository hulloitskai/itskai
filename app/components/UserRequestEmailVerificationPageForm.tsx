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

  // == Mutation
  const onError = useApolloAlertCallback("Failed to resend verification email");
  const [runMutation, { loading }] = useMutation(
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
      onError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(({ email }) => {
        runMutation({
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
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default UserRequestEmailVerificationPageForm;
