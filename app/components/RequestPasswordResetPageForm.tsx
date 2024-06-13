import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

export interface RequestPasswordResetPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetPageForm: FC<RequestPasswordResetPageFormProps> = ({
  ...otherProps
}) => {
  // == Form
  const { values, getInputProps, isDirty, submit, processing } = useInertiaForm(
    {
      action: routes.usersPasswords.create,
      method: "post",
      descriptor: "request password reset",
      initialValues: {
        email: "",
      },
      transformValues: values => ({
        user: deepUnderscoreKeys(values),
      }),
    },
  );
  const requiredFieldsFilled = useRequiredFieldsFilled(values, "email");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          label="Email"
          placeholder="jon.snow@example.com"
          required
          {...getInputProps("email")}
        />
        <Button
          type="submit"
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetPageForm;
