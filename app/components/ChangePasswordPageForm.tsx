import StrongPasswordInput from "./StrongPasswordInput";

export interface ChangePasswordPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  resetPasswordToken: string;
}

const ChangePasswordPageForm: FC<ChangePasswordPageFormProps> = ({
  resetPasswordToken,
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { getInputProps, submitting, submit } = useForm({
    action: routes.usersPasswords.update,
    descriptor: "change password",
    initialValues: {
      password: "",
    },
    validate: {
      password: (value: string) => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
    },
    transformValues: values => ({
      user: {
        ...values,
        reset_password_token: resetPasswordToken,
      },
    }),
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        description: "You are now signed in.",
      });
      router.visit(routes.home.show.path());
    },
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          {...getInputProps("password")}
          label="New password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          minLength={8}
          onStrengthCheck={setPasswordStrength}
        />
        <Button type="submit" loading={submitting}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
