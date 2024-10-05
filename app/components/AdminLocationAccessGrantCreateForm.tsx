import { NumberInput, Text } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

import { type LocationAccessGrant } from "~/types";

export interface LocationAccessGrantCreateFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onGrantCreated?: (grant: LocationAccessGrant) => void;
}

const LocationAccessGrantCreateForm: FC<LocationAccessGrantCreateFormProps> = ({
  onGrantCreated,
  ...otherProps
}) => {
  interface FormData {
    grant: LocationAccessGrant;
  }
  const { getInputProps, processing, submit } = useFetchForm({
    action: routes.adminLocationAccessGrants.create,
    method: "post",
    descriptor: "create location access grant",
    // mode: "uncontrolled",
    initialValues: {
      recipient: "",
      password: "",
      expires_in_hours: 12,
    },
    validate: {
      recipient: isNotEmpty("Recipient is required"),
      expires_in_hours: isNotEmpty("Expiration is required"),
    },
    transformValues: ({ expires_in_hours, ...attributes }) => ({
      grant: {
        ...attributes,
        expires_in_seconds: expires_in_hours * 60 * 60,
      },
    }),
    onSuccess: ({ grant }: FormData) => {
      onGrantCreated?.(grant);
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
