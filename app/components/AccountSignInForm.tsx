import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountSignInFormValues = {
  readonly email: string;
  readonly password: string;
};

export type AccountSignInFormProps = {
  readonly errors?: Record<string, string>;
};

const AccountSignInForm: FC<AccountSignInFormProps> = ({ errors }) => {
  const router = useRouter();
  const { getInputProps, onSubmit, reset, setErrors } =
    useForm<AccountSignInFormValues>({
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
        const data = { user: { email, password } };
        router.post("/account/sign_in", data, {
          errorBag: "AccountSignInForm",
          onFinish: () => {
            reset();
          },
        });
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

export default AccountSignInForm;
