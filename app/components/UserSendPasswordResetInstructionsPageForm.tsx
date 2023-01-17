import type { FC } from "react";

import { UserSendPasswordResetInstructionsMutationDocument } from "~/queries";

export type UserSendPasswordResetInstructionsPageFormValues = {
  readonly email: string;
};

export type UserSendPasswordResetInstructionsPageFormProps = {};

const UserSendPasswordResetInstructionsPageForm: FC<
  UserSendPasswordResetInstructionsPageFormProps
> = () => {
  const router = useRouter();

  // == Form
  const { getInputProps, onSubmit } =
    useForm<UserSendPasswordResetInstructionsPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Mutation
  const onError = useApolloErrorCallback("Failed to send password reset email");
  const [runMutation, { loading }] = useMutation(
    UserSendPasswordResetInstructionsMutationDocument,
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
        <Button type="submit" {...{ loading }}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default UserSendPasswordResetInstructionsPageForm;
