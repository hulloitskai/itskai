import type { ComponentPropsWithoutRef, FC } from "react";
import type { LocationAccessGrant } from "~/types";

import type { BoxProps } from "@mantine/core";
import { NumberInput, Text } from "@mantine/core";

export interface LocationAccessGrantCreateFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  readonly onCreated?: (grant: LocationAccessGrant) => void;
}

const LocationAccessGrantCreateForm: FC<LocationAccessGrantCreateFormProps> = ({
  onCreated,
  ...otherProps
}) => {
  // == Form
  const { values, getInputProps, isDirty, submit, processing } = useFetchForm<{
    grant: LocationAccessGrant;
  }>({
    action: routes.adminLocationAccessGrants.create,
    method: "post",
    descriptor: "create location access grant",
    initialValues: {
      recipient: "",
      password: "",
      expiresInHours: 12,
    },
    transformValues: ({ expiresInHours, ...attributes }) => ({
      grant: {
        ...deepUnderscoreKeys(attributes),
        expires_in_seconds: expiresInHours * 60 * 60,
      },
    }),
    onSuccess: ({ grant }) => {
      onCreated?.(grant);
    },
  });
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "recipient",
    "expiresInHours",
  );

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
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
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
          leftSection={<AddIcon />}
        >
          Create grant
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationAccessGrantCreateForm;
