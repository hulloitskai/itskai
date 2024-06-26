import type { LocationAccessGrant } from "~/types";

import { NumberInput, Text } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

export interface LocationAccessGrantCreateFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  readonly onCreated?: (grant: LocationAccessGrant) => void;
}

const LocationAccessGrantCreateForm: FC<LocationAccessGrantCreateFormProps> = ({
  onCreated,
  ...otherProps
}) => {
  const initialValues = {
    recipient: "",
    password: "",
    expiresInHours: 12,
  };
  const { getInputProps, submit, processing } = useFetchForm<
    { grant: LocationAccessGrant },
    typeof initialValues
  >({
    action: routes.adminLocationAccessGrants.create,
    method: "post",
    descriptor: "create location access grant",
    // mode: "uncontrolled",
    initialValues,
    validate: {
      recipient: isNotEmpty("Recipient is required"),
      expiresInHours: isNotEmpty("Expiration is required"),
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
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("recipient")}
          label="Recipient"
          placeholder="Jon Snow"
          required
          autoComplete="off"
        />
        <TextInput
          {...getInputProps("password")}
          label="Password"
          description="Will be randomly generated if not set."
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
        />
        <NumberInput
          {...getInputProps("expiresInHours")}
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
        />
        <Button type="submit" loading={processing} leftSection={<AddIcon />}>
          Create grant
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationAccessGrantCreateForm;
