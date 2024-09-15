import { type MantineSize } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

import classes from "./LocationAccessForm.module.css";

export interface LocationAccessFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children"> {
  autofillPassword?: string;
  size?: MantineSize | (string & {});
  onSuccess?: (token: string) => void;
}

const LocationAccessForm: FC<LocationAccessFormProps> = ({
  autofillPassword,
  onSuccess,
  size = "md",
  ...otherProps
}) => {
  const initialValues = {
    password: "",
  };
  const { getInputProps, processing, setFieldValue, submit } = useFetchForm<
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
