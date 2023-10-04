import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

export type LocationTrackFormProps = Omit<BoxProps, "children"> & {
  readonly onSubmit: (password: string) => void;
};

type LocationTrackFormValues = {
  readonly password: string;
};

const LocationTrackForm: FC<LocationTrackFormProps> = ({
  onSubmit: handleSubmit,
  ...otherProps
}) => {
  // == Form
  const { getInputProps, onSubmit } = useForm<LocationTrackFormValues>({
    initialValues: {
      password: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(({ password }) => {
        handleSubmit(password);
      })}
      {...otherProps}
    >
      <Group align="end" gap={8}>
        <TextInput
          label="Got a password?"
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
          size="sm"
          styles={{
            root: {
              flexGrow: 1,
            },
            label: {
              marginBottom: 4,
            },
          }}
          {...getInputProps("password")}
        />
        <Button type="submit" size="sm">
          Lock it in!
        </Button>
      </Group>
    </Box>
  );
};

export default LocationTrackForm;
