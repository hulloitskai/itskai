import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps, MantineSize } from "@mantine/core";

import classes from "./LocationAccessForm.module.css";
import { isNotEmpty } from "@mantine/form";

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
  const { getInputProps, submit, processing } = useFetchForm<{
    token: string;
  }>({
    action: routes.locations.access,
    method: "post",
    descriptor: "access location",
    mode: "uncontrolled",
    initialValues: {
      password: "",
    },
    validate: {
      password: isNotEmpty("Password is required"),
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

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group gap={8} align="start">
        <TextInput
          {...getInputProps("password")}
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
        />
        <Button
          type="submit"
          size="sm"
          loading={processing}
          className={classes.button}
        >
          Nyoom in
        </Button>
      </Group>
    </Box>
  );
};

export default LocationAccessForm;
