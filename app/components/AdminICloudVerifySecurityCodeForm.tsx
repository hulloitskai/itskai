import { InputWrapper, PinInput } from "@mantine/core";

import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import { type ICloudConnection } from "~/types";

export interface AdminICloudVerifySecurityCodeFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onVerified?: (connection: ICloudConnection) => void;
}

const AdminICloudVerifySecurityCodeForm: FC<
  AdminICloudVerifySecurityCodeFormProps
> = ({ onVerified, ...otherProps }) => {
  const initialValues = { code: "" };
  interface FormData {
    connection: ICloudConnection;
  }
  const { getInputProps, submitting, submit } = useFetchForm({
    name: "icloud-verify",
    action: routes.adminICloudConnections.verifySecurityCode,
    descriptor: "verify security code",
    // mode: "uncontrolled",
    initialValues,
    validate: {
      code: value => {
        if (value.length !== 6) {
          return "Must be 6 digits";
        }
      },
    },
    transformValues: values => ({
      verification: values,
    }),
    onSuccess: ({ connection }: FormData) => {
      closeAllModals();
      toast.success("Authenticated successfully with iCloud.");
      onVerified?.(connection);
    },
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <InputWrapper label="Security code">
          <PinInput
            {...getInputProps("code")}
            type="number"
            length={6}
            oneTimeCode
            mt={4}
          />
        </InputWrapper>
        <Button
          type="submit"
          loading={submitting}
          leftSection={<SecurityCodeIcon />}
        >
          Verify code
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminICloudVerifySecurityCodeForm;
