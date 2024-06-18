import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import StrongPasswordInput from "./StrongPasswordInput";

export type SignupPageFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit">;

type SignupFormValues = {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
};

const SignupPageForm: FC<SignupPageFormProps> = props => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { values, errors, getInputProps, isDirty, submit, processing } =
    useInertiaForm<SignupFormValues>({
      action: routes.usersRegistrations.create,
      method: "post",
      descriptor: "create account",
      initialValues: {
        user: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
      },
      validate: {
        user: {
          password: () => {
            if (passwordStrength < 1.0) {
              return "Password is too weak";
            }
          },
          password_confirmation: (value, { user }) => {
            if (user.password != value) {
              return "Password confirmation does not match password";
            }
          },
        },
      },
      onError: ({ setFieldValue }) => {
        setFieldValue("user.password", "");
        setFieldValue("user.password_confirmation", "");
      },
    });
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "user.name",
    "user.email",
    "user.password",
    "user.password_confirmation",
  );

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          label="Name"
          placeholder="Jon Snow"
          autoComplete="name"
          required
          {...getInputProps("user.name")}
        />
        <TextInput
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
          {...getInputProps("user.email")}
        />
        <StrongPasswordInput
          label="Password"
          placeholder="secret-passphrase"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("user.password")}
        />
        <Transition
          transition="fade"
          mounted={
            !isEmpty(errors) ||
            (isDirty("user.password") && !!values.user.password)
          }
        >
          {style => (
            <PasswordInput
              label="Password confirmation"
              placeholder="secret-passphrase"
              autoComplete="new-password"
              required
              {...{ style }}
              {...getInputProps("user.password_confirmation")}
            />
          )}
        </Transition>
        <Button
          type="submit"
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPageForm;
