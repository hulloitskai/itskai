import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type UserRegisterPageFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type UserRegisterPageFormProps = {};

const UserRegisterPageForm: FC<UserRegisterPageFormProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<UserRegisterPageFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    });
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
          errorBag: UserRegisterPageForm.name,
          onBefore: () => setLoading(true),
          onError: errors => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showAlert({ message: "Failed to Register account." });
          },
          onFinish: () => setLoading(false),
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
        <Button type="submit" {...{ loading }}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default UserRegisterPageForm;
