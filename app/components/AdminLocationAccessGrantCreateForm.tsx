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
  const initialValues = {
    recipient: "",
    password: "",
    expiresInHours: 12,
  };
  const { getInputProps, processing, submit } = useFetchForm<
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
        ...underscoreKeys(attributes),
        expires_in_seconds: expiresInHours * 60 * 60,
      },
    }),
    onSuccess: ({ grant }) => {
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
