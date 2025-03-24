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
      email: isEmail("invalid email address"),
    },
    transformValues: attributes => ({ user: attributes }),
    onSuccess: () => {
      toast.success("check your inbox!", {
        description: "password reset link was sent to your email.",
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
          label="email"
          placeholder="jon.snow@example.com"
          required
          withAsterisk={false}
        />
        <Button
          type="submit"
          disabled={linkSent || !filled}
          loading={submitting}
        >
          continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetPageForm;
