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
          authenticity_token: csrfToken(),
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        };
        Inertia.post("/account", data as any);
      })}
    >
      <Stack spacing="xs">
        <TextInput label="Name" required {...getInputProps("name")} />
        <TextInput label="Email" required {...getInputProps("email")} />
        <PasswordInput
          label="Password"
          required
          {...getInputProps("password")}
        />
        <PasswordInput
          label="Password Confirmation"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
