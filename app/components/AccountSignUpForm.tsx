import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountSignUpFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type AccountSignUpFormProps = {
  readonly errors?: Record<string, string>;
};

const AccountSignUpForm: FC<AccountSignUpFormProps> = ({ errors }) => {
  const router = useRouter();
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<AccountSignUpFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      initialErrors: errors,
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
        router.post("/account", data, {
          errorBag: "AccountSignUpForm",
          onFinish: () => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
          },
        });
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

export default AccountSignUpForm;
