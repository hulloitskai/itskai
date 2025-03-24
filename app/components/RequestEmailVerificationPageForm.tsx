import { isEmail } from "@mantine/form";

export interface RequestEmailVerificationPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "onSubmit"> {}

const RequestEmailVerificationPageForm: FC<
  RequestEmailVerificationPageFormProps
> = ({ ...otherProps }) => {
  const [linkSent, setLinkSent] = useState(false);

  // == Form
  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersConfirmations.create,
    descriptor: "send verification email",
    initialValues: {
      email: "",
    },
    transformValues: values => ({ user: values }),
    validate: {
      email: isEmail("invalid email address"),
    },
    onSuccess: () => {
      toast.success("check your inbox!", {
        description: "verification link was sent to your email.",
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

export default RequestEmailVerificationPageForm;
