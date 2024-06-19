import type { ComponentPropsWithoutRef, FC } from "react";
import type { ICloudConnection } from "~/types";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import type { BoxProps } from "@mantine/core";
import { InputWrapper, PinInput } from "@mantine/core";

export interface AdminICloudVerifySecurityCodeFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onVerified?: (connection: ICloudConnection) => void;
}

const AdminICloudVerifySecurityCodeForm: FC<
  AdminICloudVerifySecurityCodeFormProps
> = ({ onVerified, ...otherProps }) => {
  const { getInputProps, submit, processing } = useFetchForm<{
    connection: ICloudConnection;
  }>({
    action: routes.adminICloudConnections.verifySecurityCode,
    method: "post",
    descriptor: "verify security code",
    mode: "uncontrolled",
    initialValues: { code: "" },
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
    onSuccess: ({ connection }) => {
      closeAllModals();
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
          loading={processing}
          leftSection={<SecurityCodeIcon />}
        >
          Verify Code
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminICloudVerifySecurityCodeForm;
