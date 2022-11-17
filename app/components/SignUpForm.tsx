import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type SignUpFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type SignUpFormProps = {
  readonly errors?: Record<string, string>;
};

const SignUpForm: FC<SignUpFormProps> = ({ errors }) => {
  const router = useRouter();
  const { getInputProps, onSubmit, setErrors } = useForm<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);
  return (
    <form
      onSubmit={onSubmit(({ name, email, password, passwordConfirmation }) => {
        const data = {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        };
        router.post("/account", data);
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="friend@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="potato-123"
          required
          {...getInputProps("password")}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="potato-123"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
