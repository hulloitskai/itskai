import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
import { isEmail } from "@mantine/form";

export interface RequestEmailVerificationPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "onSubmit"> {}

const RequestEmailVerificationPageForm: FC<
  RequestEmailVerificationPageFormProps
> = ({ ...otherProps }) => {
  // == Form
  const { getInputProps, submit, processing } = useInertiaForm({
    action: routes.usersConfirmations.create,
    method: "post",
    descriptor: "send verification email",
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
    },
    transformValues: values => ({
      user: deepUnderscoreKeys(values),
    }),
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="jon.snow@example.com"
          required
        />
        <Button type="submit" loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestEmailVerificationPageForm;
