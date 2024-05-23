import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import { RequestPasswordResetMutationDocument } from "~/helpers/graphql";

export type RequestPasswordResetPageFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit">;

type RequestPasswordResetPageFormValues = {
  readonly email: string;
};

const RequestPasswordResetPageForm: FC<RequestPasswordResetPageFormProps> = ({
  ...otherProps
}) => {
  const router = useRouter();

  // == Form
  const { getInputProps, isDirty, onSubmit } =
    useForm<RequestPasswordResetPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Email Request
  const onRequestEmailError = useApolloAlertCallback(
    "Failed to request password reset email",
  );
  const [requestEmail, { loading: requestingEmail }] = useMutation(
    RequestPasswordResetMutationDocument,
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

export default RequestPasswordResetPageForm;
