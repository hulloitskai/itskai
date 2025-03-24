import { PinInput } from "@mantine/core";

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
  const { getInputProps, submitting, submit } = useForm({
    name: "icloud-verify",
    action: routes.adminICloudConnections.verifySecurityCode,
    descriptor: "verify security code",
    initialValues,
    validate: {
      code: (value: string) => {
        if (value.length !== 6) {
          return "must be 6 digits";
        }
      },
    },
    transformValues: values => ({
      verification: values,
    }),
    onSuccess: ({ connection }: FormData) => {
      closeAllModals();
      toast.success("authenticated successfully with iCloud.");
      onVerified?.(connection);
    },
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs" align="center" pt={4}>
        <PinInput
          {...getInputProps("code")}
          type="number"
          length={6}
          oneTimeCode
          autoFocus
        />
        <Button
          type="submit"
          loading={submitting}
          leftSection={<SecurityCodeIcon />}
        >
          verify code
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminICloudVerifySecurityCodeForm;
