import type { FC } from "react";

import { RequestUserPasswordResetMutationDocument } from "~/helpers/graphql";

export type UserRequestPasswordResetPageFormValues = {
  readonly email: string;
};

export type UserRequestPasswordResetPageFormProps = {};

const UserRequestPasswordResetPageForm: FC<
  UserRequestPasswordResetPageFormProps
> = () => {
  const router = useRouter();

  // == Form
  const { getInputProps, isDirty, onSubmit } =
    useForm<UserRequestPasswordResetPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Mutation
  const onError = useApolloAlertCallback("Failed to send password reset email");
  const [runMutation, { loading }] = useMutation(
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
      <Stack spacing="xs">
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

export default UserRequestPasswordResetPageForm;
