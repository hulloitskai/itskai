import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps, MantineSize } from "@mantine/core";

import classes from "./LocationAccessForm.module.css";

export interface LocationAccessFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children"> {
  size?: MantineSize | (string & {});
  onSuccess?: (token: string) => void;
}

const LocationAccessForm: FC<LocationAccessFormProps> = ({
  size = "md",
  onSuccess,
  ...otherProps
}) => {
  const { values, getInputProps, isDirty, submit, processing } = useFetchForm<{
    token: string;
  }>({
    action: routes.locations.access,
    method: "post",
    descriptor: "access location",
    initialValues: {
      password: "",
    },
    transformValues: values => ({
      access_request: values,
    }),
    onSuccess: ({ token }) => {
      onSuccess?.(token);
    },
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });
  const requiredFieldsFilled = useRequiredFieldsFilled(values, "password");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group gap={8} align="start">
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
        <Button
          type="submit"
          size="sm"
          loading={processing}
          disabled={!isDirty() || !requiredFieldsFilled}
          className={classes.button}
        >
          Nyoom in
        </Button>
      </Group>
    </Box>
  );
};

export default LocationAccessForm;
