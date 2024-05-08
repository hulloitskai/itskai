import type { FC } from "react";
import type { BoxProps, MantineSize } from "@mantine/core";
import { CreateLocationAccessMutationDocument } from "~/helpers/graphql";

export type LocationAccessFormProps = BoxProps & {
  readonly size?: MantineSize | (string & {});
  readonly onCreate: (password: string) => void;
};

type LocationAccessFormValues = {
  readonly password: string;
};

const LocationAccessForm: FC<LocationAccessFormProps> = ({
  size = "md",
  onCreate,
  ...otherProps
}) => {
  // == Form
  const { getInputProps, onSubmit } = useForm<LocationAccessFormValues>({
    initialValues: {
      password: "",
    },
  });

  // == Access
  const onCreateAccessError = useApolloAlertCallback(
    "Failed to access location details",
  );
  const [createAccess, { loading: accessing }] = useMutation(
    CreateLocationAccessMutationDocument,
    {
      onError: onCreateAccessError,
      onCompleted: ({ payload: { access } }) => {
        onCreate(access.token);
      },
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(({ password }) => {
        createAccess({ variables: { input: { password } } });
      })}
      {...otherProps}
    >
      <Group align="end" gap={8}>
        <TextInput
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
          styles={{
            root: {
              flexGrow: 1,
            },
          }}
          {...{ size }}
          {...getInputProps("password")}
        />
        <Button type="submit" size="sm" loading={accessing}>
          Nyoom in
        </Button>
      </Group>
    </Box>
  );
};

export default LocationAccessForm;
