import type { FC } from "react";

import { NumberInput, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import type { BoxProps } from "@mantine/core";

import { CreateLocationAccessGrantMutationDocument } from "~/helpers/graphql";

export type LocationAccessGrantCreateFormProps = BoxProps & {
  onCreate: () => void;
};

type LocationAccessGrantCreateFormValues = {
  recipient: string;
  password: string;
  expiresInHours: number;
};

type LocationAccessGrantCreateFormSubmission = Omit<
  LocationAccessGrantCreateFormValues,
  "expiresInHours"
> & {
  expiresInSeconds: number;
};

const LocationAccessGrantCreateForm: FC<LocationAccessGrantCreateFormProps> = ({
  onCreate,
  ...otherProps
}) => {
  const { copy } = useClipboard();

  // == Form
  const { getInputProps, isDirty, onSubmit, setErrors } = useForm<
    LocationAccessGrantCreateFormValues,
    (
      values: LocationAccessGrantCreateFormValues,
    ) => LocationAccessGrantCreateFormSubmission
  >({
    initialValues: {
      recipient: "",
      password: "",
      expiresInHours: 12,
    },
    transformValues: ({ expiresInHours, ...values }) => {
      return {
        expiresInSeconds: expiresInHours * 60 * 60,
        ...values,
      };
    },
  });

  // == Grant Creation
  const onCreateGrantError = useApolloAlertCallback(
    "Failed to create access grant",
  );
  const [createGrant, { loading: creatingGrant }] = useMutation(
    CreateLocationAccessGrantMutationDocument,
    {
      onCompleted: ({ payload: { grant, errors } }) => {
        if (grant) {
          closeAllModals();
          copy(grant.locateUrl);
          showNotice({
            title: "Access grant created",
            message: "Locate URL copied to clipboard!",
          });
          onCreate();
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = buildFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't create grant");
        }
      },
      onError: onCreateGrantError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(submission => {
        createGrant({
          variables: {
            input: submission,
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <TextInput
          label="Recipient"
          placeholder="A friend"
          required
          autoComplete="off"
          {...getInputProps("recipient")}
        />
        <TextInput
          label="Password"
          description="Will be randomly generated if not set."
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
          {...getInputProps("password")}
        />
        <NumberInput
          label="Expires in"
          required
          min={1}
          inputContainer={children => (
            <Group gap="sm" wrap="nowrap">
              {children}
              <Text size="sm">hours</Text>
            </Group>
          )}
          styles={{
            wrapper: {
              flexGrow: 1,
            },
          }}
          {...getInputProps("expiresInHours")}
        />
        <Button
          type="submit"
          disabled={!isDirty()}
          loading={creatingGrant}
          leftSection={<AddIcon />}
        >
          Create grant
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationAccessGrantCreateForm;
