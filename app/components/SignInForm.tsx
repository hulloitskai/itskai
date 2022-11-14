import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type SignInFormValues = {
  readonly email: string;
  readonly password: string;
};

export type SignInFormProps = {
  readonly errors?: Record<string, string>;
};

const SignInForm: FC<SignInFormProps> = ({ errors }) => {
  const { getInputProps, onSubmit, setErrors } = useForm<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);
  return (
    <form
      onSubmit={onSubmit(({ email, password }) => {
        const data = {
          authenticity_token: csrfToken(),
          user: {
            email,
            password,
          },
        };
        Inertia.post("/account/sign_in", data as any, {});
      })}
    >
      <Stack spacing="xs">
        <TextInput label="Email" required {...getInputProps("email")} />
        <PasswordInput
          label="Password"
          required
          {...getInputProps("password")}
        />
        <Button type="submit">Sign In</Button>
      </Stack>
    </form>
  );
};

export default SignInForm;
