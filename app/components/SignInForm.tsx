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
  const router = useRouter();
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
          user: {
            email,
            password,
          },
        };
        router.post("/account/sign_in", data);
      })}
    >
      <Stack spacing="xs">
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
        <Button type="submit">Sign In</Button>
      </Stack>
    </form>
  );
};

export default SignInForm;
