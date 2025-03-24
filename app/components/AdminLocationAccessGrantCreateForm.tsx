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
  const { getInputProps, submitting, submit } = useForm({
    action: routes.adminLocationAccessGrants.create,
    descriptor: "create location access grant",
    initialValues: {
      recipient: "",
      password: "",
      expires_in_hours: 12,
    },
    validate: {
      recipient: isNotEmpty("recipient is required"),
      expires_in_hours: isNotEmpty("expiration is required"),
    },
    transformValues: ({ expires_in_hours, ...attributes }) => ({
      grant: {
        ...attributes,
        expires_in_seconds: expires_in_hours * 60 * 60,
      },
    }),
    onSuccess: ({ grant }: FormData) => {
      void mutateRoute(routes.adminLocationAccessGrants.index);
      onGrantCreated?.(grant);
    },
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("recipient")}
          label="recipient"
          placeholder="Jon Snow"
          required
          autoComplete="off"
        />
        <TextInput
          {...getInputProps("password")}
          label="password"
          description="will be randomly generated if not set."
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
        />
        <NumberInput
          {...getInputProps("expires_in_hours")}
          label="expires in"
          required
          min={1}
          inputContainer={children => (
            <Group gap="sm">
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
        <Button type="submit" loading={submitting} leftSection={<AddIcon />}>
          create grant
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationAccessGrantCreateForm;
