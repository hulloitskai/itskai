import type { FC } from "react";

import { RequestEmailVerificationMutationDocument } from "~/helpers/graphql";

export type RequestEmailVerificationPageFormProps = {};

type RequestEmailVerificationPageFormValues = {
  email: string;
};

const RequestEmailVerificationPageForm: FC<
  RequestEmailVerificationPageFormProps
> = ({ ...otherProps }) => {
  // == Routing
  const router = useRouter();

  // == Form
  const { getInputProps, isDirty, onSubmit } =
    useForm<RequestEmailVerificationPageFormValues>({
      initialValues: {
        email: "",
      },
    });

  // == Email Request
  const onRequestEmailError = useApolloAlertCallback(
    "Failed to request new verification email",
  );
  const [requestEmail, { loading: requestingEmail }] = useMutation(
    RequestEmailVerificationMutationDocument,
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

export default RequestEmailVerificationPageForm;
