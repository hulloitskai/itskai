import type { ComponentPropsWithoutRef, FC } from "react";

import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

export interface LoginPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginPageForm: FC<LoginPageFormProps> = props => {
  // == Form
  const { values, getInputProps, isDirty, submit, processing } = useInertiaForm(
    {
      action: routes.usersSessions.create,
      method: "post",
      descriptor: "sign in",
      initialValues: {
        email: "",
        password: "",
        rememberMe: true,
      },
      transformValues: values => ({
        user: deepUnderscoreKeys(values),
      }),
      onError: ({ setFieldValue }) => {
        setFieldValue("password", "");
      },
    },
  );
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "email",
    "password",
  );

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="secret-passphrase"
          autoComplete="current-password"
          required
          {...getInputProps("password")}
        />
        <Tooltip
          label="Uncheck this if you're signing in from a shared device."
          position="top-start"
          withArrow
        >
          <Checkbox
            label="Stay signed in"
            styles={{
              input: {
                cursor: "pointer",
              },
              label: {
                cursor: "pointer",
              },
            }}
            {...getInputProps("rememberMe", { type: "checkbox" })}
          />
        </Tooltip>
        <Button
          type="submit"
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPageForm;
