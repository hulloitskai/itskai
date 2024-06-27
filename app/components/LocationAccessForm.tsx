import type { MantineSize } from "@mantine/core";

import classes from "./LocationAccessForm.module.css";
import { isNotEmpty } from "@mantine/form";

export interface LocationAccessFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children"> {
  autofillPassword?: string;
  size?: MantineSize | (string & {});
  onSuccess?: (token: string) => void;
}

const LocationAccessForm: FC<LocationAccessFormProps> = ({
  autofillPassword,
  size = "md",
  onSuccess,
  ...otherProps
}) => {
  const initialValues = {
    password: "",
  };
  const { getInputProps, setFieldValue, submit, processing } = useFetchForm<
    { token: string },
    typeof initialValues
  >({
    action: routes.locations.access,
    method: "post",
    descriptor: "access location",
    // mode: "uncontrolled",
    initialValues,
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
  useEffect(() => {
    if (autofillPassword) {
      setFieldValue("password", autofillPassword);
      submit();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group gap={8} align="start">
        <TextInput
          {...getInputProps("password")}
          {...{ size }}
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
          styles={{
            root: {
              flexGrow: 1,
            },
          }}
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
