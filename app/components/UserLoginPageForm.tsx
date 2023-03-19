import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import { createApolloLink } from "~/helpers/apollo";

export type UserLoginPageFormProps = {};

export type UserLoginPageFormValues = {
  readonly email: string;
  readonly password: string;
  readonly rememberMe: boolean;
};

const UserLoginPageForm: FC<UserLoginPageFormProps> = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  // == Form
  const { getInputProps, onSubmit, reset, values, setFieldValue } =
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
        router.post("/user/login", data, {
          onBefore: () => {
            setLoading(true);
          },
          onSuccess: ({
            props: {
              csrf: { token: csrfToken },
            },
          }: any) => {
            const link = createApolloLink({ csrfToken });
            client.setLink(link);
            client.resetStore();
          },
          onFinish: () => {
            reset();
            setLoading(false);
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
        <Tooltip
          label="Uncheck this if you're signing in from a shared device."
          position="top-start"
          withinPortal
          withArrow
        >
          <Checkbox
            label="Stay signed in"
            checked={rememberMe}
            color="indigo"
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
        <Button type="submit" {...{ loading }}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default UserLoginPageForm;
