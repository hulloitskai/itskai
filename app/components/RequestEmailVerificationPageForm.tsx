import { isEmail } from "@mantine/form";

export interface RequestEmailVerificationPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "onSubmit"> {}

const RequestEmailVerificationPageForm: FC<
  RequestEmailVerificationPageFormProps
> = ({ ...otherProps }) => {
  // == Form
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersConfirmations.create,
    descriptor: "send verification email",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
    },
  });
  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="jon.snow@example.com"
          required
          withAsterisk={false}
        />
        <Button type="submit" disabled={!filled} loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestEmailVerificationPageForm;
