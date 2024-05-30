import type { ComponentPropsWithoutRef, FC } from "react";

import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import type { LoginPageProps } from "~/pages/LoginPage";

export type LoginPageFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit">;

type LoginPageFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPageForm: FC<LoginPageFormProps> = props => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // == Form
  const { getInputProps, values, setFieldValue, isDirty, onSubmit } =
    useForm<LoginPageFormValues>({
      initialValues: {
        email: "",
        password: "",
        rememberMe: true,
      },
    });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(({ email, password, rememberMe }) => {
        const data = {
          user: {
            email,
            password,
            remember_me: rememberMe,
          },
        };
        router.post("/login", data, {
          onBefore: () => {
            setLoading(true);
          },
          onSuccess: ({ component, props }) => {
            if (component === "LoginPage") {
              const { failed } = props as unknown as LoginPageProps;
              if (failed) {
                setFieldValue("password", "");
              }
            }
          },
          onFinish: () => {
            setLoading(false);
          },
        });
      })}
      {...props}
    >
      <Stack gap="xs">
        <TextInput
          label="Email"
          placeholder="jon.snow@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="secret-passphrase"
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
            checked={values.rememberMe}
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
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPageForm;
