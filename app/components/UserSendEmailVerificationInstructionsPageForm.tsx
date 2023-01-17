import type { FC } from "react";

import { UserSendEmailVerificationInstructionsMutationDocument } from "~/queries";

export type UserSendEmailVerificationInstructionsPageFormValues = {
  readonly email: string;
};

export type UserSendEmailVerificationInstructionsPageFormProps = {};

const UserSendEmailVerificationInstructionsPageForm: FC<
  UserSendEmailVerificationInstructionsPageFormProps
> = () => {
  const router = useRouter();

  // == Form
  const { getInputProps, onSubmit } =
    useForm<UserSendEmailVerificationInstructionsPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Mutation
  const onError = useApolloErrorCallback("Failed to resend verification email");
  const [runMutation, { loading }] = useMutation(
    UserSendEmailVerificationInstructionsMutationDocument,
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

export default UserSendEmailVerificationInstructionsPageForm;
