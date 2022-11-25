import { Text } from "@mantine/core";
import invariant from "tiny-invariant";
import type { FC } from "react";

import { AccountEmailFormQueryDocument } from "~/queries";
import type { AccountEditPageViewerFragment } from "~/queries";

export type AccountEmailFormValues = {
  readonly email: string;
};

export type AccountEmailFormProps = {
  readonly viewer: AccountEditPageViewerFragment;
  readonly errors?: Record<string, string>;
};

const AccountEmailForm: FC<AccountEmailFormProps> = ({ viewer, errors }) => {
  const { email, unconfirmedEmail } = viewer;
  const client = useApolloClient();
  const router = useRouter();
  const initialValues = useMemo<AccountEmailFormValues>(
    () => ({ email: unconfirmedEmail || email }),
    [viewer],
  );
  const { getInputProps, onSubmit, setValues, setErrors } =
    useForm<AccountEmailFormValues>({
      initialValues: initialValues,
      initialErrors: errors,
    });
  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);
  return (
    <form
      onSubmit={onSubmit(({ email }) => {
        const data = { user: { email } };
        router.put("/account", data, {
          errorBag: "AccountEmailForm",
          onSuccess: async () => {
            const {
              data: { viewer },
            } = await client.query({
              query: AccountEmailFormQueryDocument,
              variables: {},
              fetchPolicy: "network-only",
            });
            invariant(viewer, "missing viewer");
            const { email, unconfirmedEmail } = viewer;
            setValues({ email: unconfirmedEmail || email });
            if (unconfirmedEmail) {
              showNotice({
                message:
                  "Please check your email and follow the confirmation link " +
                  "to confirm your new email address.",
              });
            }
          },
        });
      })}
    >
      <Stack spacing="xs">
        <Box>
          <TextInput
            label="Email"
            placeholder="applesauce"
            required
            {...getInputProps("email")}
            {...(unconfirmedEmail
              ? {
                  rightSectionWidth: 110,
                  rightSection: (
                    <Badge size="xs" color="yellow.8" variant="outline">
                      Unconfirmed
                    </Badge>
                  ),
                }
              : {})}
          />
          {email && unconfirmedEmail && (
            <Text size="xs" color="dimmed" mt={4}>
              Last confirmed email:{" "}
              <Text color="gray.7" weight={500} span>
                {email}
              </Text>
              <br />
              Check your inbox to confirm your new email address.
            </Text>
          )}
        </Box>
        <Button type="submit">Change Email</Button>
      </Stack>
    </form>
  );
};

export default AccountEmailForm;
