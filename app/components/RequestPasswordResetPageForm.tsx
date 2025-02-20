import { isEmail } from "@mantine/form";

export interface RequestPasswordResetPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetPageForm: FC<RequestPasswordResetPageFormProps> = ({
  ...otherProps
}) => {
  const [linkSent, setLinkSent] = useState(false);

  // == Form
  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersPasswords.create,
    descriptor: "request password reset",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Invalid email address"),
    },
    transformValues: attributes => ({ user: attributes }),
    onSuccess: () => {
      toast.success("Check your inbox!", {
        description: "Password reset link was sent to your email.",
      });
      setLinkSent(true);
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
        <Button
          type="submit"
          disabled={linkSent || !filled}
          loading={submitting}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetPageForm;
