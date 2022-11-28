import type { FC } from "react";
import { Text } from "@mantine/core";
import invariant from "tiny-invariant";

import type { AccountEditPageViewerFragment } from "~/queries";

import type { AccountEditPageProps } from "~/pages/AccountEditPage";

export type AccountEditPageEmailFormValues = {
  readonly email: string;
};

export type AccountEditPageEmailFormProps = {
  readonly viewer: AccountEditPageViewerFragment;
};

const AccountEditPageEmailForm: FC<AccountEditPageEmailFormProps> = ({
  viewer,
}) => {
  const { email, unconfirmedEmail } = viewer;
  const router = useRouter();
  const initialValues = useMemo<AccountEditPageEmailFormValues>(
    () => ({ email: unconfirmedEmail || email }),
    [viewer],
  );
  const { values, getInputProps, onSubmit, setValues, setErrors } =
    useForm<AccountEditPageEmailFormValues>({
      initialValues: initialValues,
    });
  return (
    <form
      onSubmit={onSubmit(({ email }) => {
        const data = { user: { email } };
        router.put("/account", data, {
          errorBag: "AccountEmailForm",
          preserveScroll: true,
          onSuccess: async page => {
            const previouslyUnconfirmedEmail = unconfirmedEmail;
            resolve(() => {
              const {
                data: {
                  viewer: { email, unconfirmedEmail },
                },
              } = page.props as unknown as AccountEditPageProps;
              if (unconfirmedEmail) {
                showNotice({
                  message:
                    "Please check your email and follow the confirmation " +
                    "link to confirm your new email address.",
                });
              } else if (previouslyUnconfirmedEmail) {
                showNotice({
                  message: "Your email change request has been cancelled.",
                });
              }
              setValues({ email: unconfirmedEmail || email });
            });
          },
          onError: setErrors,
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

export default AccountEditPageEmailForm;
