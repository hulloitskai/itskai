import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import type { UserLoginPageProps } from "~/pages/UserLoginPage";

export type UserLoginPageFormProps = {};

export type UserLoginPageFormValues = {
  readonly email: string;
  readonly password: string;
  readonly rememberMe: boolean;
};

const UserLoginPageForm: FC<UserLoginPageFormProps> = () => {
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

  // == Markup
  return (
    <form
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
            onChange={() => {
              setFieldValue("rememberMe", !rememberMe);
            }}
          />
        </Tooltip>
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};

export default UserLoginPageForm;
