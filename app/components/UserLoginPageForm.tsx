import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import { createApolloLink } from "~/helpers/apollo";

export type UserLoginPageFormValues = {
  readonly email: string;
  readonly password: string;
};

export type UserLoginPageFormProps = {};

const UserLoginPageForm: FC<UserLoginPageFormProps> = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const { getInputProps, onSubmit, reset } = useForm<UserLoginPageFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <form
      onSubmit={onSubmit(({ email, password }) => {
        const data = { user: { email, password } };
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
        <Button type="submit" {...{ loading }}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default UserLoginPageForm;
