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
  interface FormData {
    token: string;
  }
  const { values, getInputProps, submitting, setFieldValue, submit } = useForm({
    action: routes.locations.access,
    descriptor: "access location",
    initialValues: {
      password: "",
    },
    validate: {
      password: isNotEmpty("Password is required"),
    },
    transformValues: values => ({
      access_request: values,
    }),
    onSuccess: ({ token }: FormData) => {
      onSuccess?.(token);
    },
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });
  const filled = useFieldsFilled(values);
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
          className={classes.passwordInput}
          {...{ size }}
          placeholder="porcupine"
          autoCapitalize="false"
          autoCorrect="false"
          autoComplete="false"
        />
        <Button
          className={classes.button}
          type="submit"
          size="sm"
          disabled={!filled}
          loading={submitting}
        >
          Nyoom in
        </Button>
      </Group>
    </Box>
  );
};

export default LocationAccessForm;
