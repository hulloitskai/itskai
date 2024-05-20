import type { ComponentPropsWithoutRef, FC } from "react";

import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import type { UserLoginPageProps } from "~/pages/UserLoginPage";

export type UserLoginPageFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children">;

export type UserLoginPageFormValues = {
  readonly email: string;
  readonly password: string;
  readonly rememberMe: boolean;
};

const UserLoginPageForm: FC<UserLoginPageFormProps> = props => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // == Form
  const { getInputProps, values, setFieldValue, isDirty, onSubmit } =
    useForm<UserLoginPageFormValues>({
      initialValues: {
        email: "",
        password: "",
        rememberMe: true,
      },
    });
  const { rememberMe } = values;

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
            if (component === "UserLoginPage") {
              const { failed } = props as unknown as UserLoginPageProps;
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
            checked={rememberMe}
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

export default UserLoginPageForm;
