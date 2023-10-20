import type { FC } from "react";

import { NumberInput, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import type { BoxProps } from "@mantine/core";

import { CreateLocationAccessGrantMutationDocument } from "~/helpers/graphql";

export type LocationAccessGrantCreateFormProps = Omit<BoxProps, "children"> & {
  readonly onCreate: () => void;
};

type LocationAccessGrantCreateFormValues = {
  readonly recipient: string;
  readonly password: string;
  readonly expiresInHours: number;
};

type LocationAccessGrantCreateFormSubmission = Omit<
  LocationAccessGrantCreateFormValues,
  "expiresInHours"
> & {
  readonly expiresInSeconds: number;
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

  // == Mutation
  const onError = useApolloAlertCallback("Failed to create access grant");
  const [runMutation, { loading }] = useMutation(
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
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Failed to create grant");
        }
      },
      onError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(submission => {
        runMutation({
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
          leftSection={<AddIcon />}
          disabled={!isDirty()}
          {...{ loading }}
        >
          Create grant
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationAccessGrantCreateForm;
