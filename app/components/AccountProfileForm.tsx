import type { FC } from "react";

import { AccountUpdateMutationDocument } from "~/queries";
import type { AccountEditViewerFragment } from "~/queries";

export type AccountProfileFormValues = {
  readonly name: string;
};

export type AccountProfileFormProps = {
  readonly viewer: AccountEditViewerFragment;
};

const AccountProfileForm: FC<AccountProfileFormProps> = ({ viewer }) => {
  const router = useRouter();
  const initialValues = useMemo<AccountProfileFormValues>(
    () => pick(viewer, "name"),
    [viewer],
  );
  const { getInputProps, onSubmit, setErrors } =
    useForm<AccountProfileFormValues>({
      initialValues,
    });
  const onError = useApolloErrorCallback("Failed to update account");
  const [runMutation, { loading }] = useMutation(
    AccountUpdateMutationDocument,
    {
      onCompleted: ({ payload: { errors } }) => {
        if (errors) {
          setErrors(formErrors(errors));
        } else {
          router.reload();
          showNotice({ message: "You've updated your account." });
        }
      },
      onError,
    },
  );
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <Button type="submit" {...{ loading }}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default AccountProfileForm;
