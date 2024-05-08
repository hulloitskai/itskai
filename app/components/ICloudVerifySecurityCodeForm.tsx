import type { FC } from "react";
import type { BoxProps } from "@mantine/core";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";
import { InputWrapper, PinInput } from "@mantine/core";

import { VerifyICloudSecurityCodeMutationDocument } from "~/helpers/graphql";

export type ICloudVerifySecurityCodeFormProps = BoxProps & {
  readonly onVerify: () => void;
};

const ICloudVerifySecurityCodeForm: FC<ICloudVerifySecurityCodeFormProps> = ({
  onVerify,
  ...otherProps
}) => {
  // == Verifying Security Code
  const onVerifySecurityCodeError = useApolloAlertCallback(
    "Failed to verify security code",
  );
  const [verifySecurityCode, { loading: verifying }] = useMutation(
    VerifyICloudSecurityCodeMutationDocument,
    {
      onCompleted: () => {
        closeAllModals();
        showNotice({ message: "Successfully authenticated with iCloud." });
        onVerify();
      },
      onError: onVerifySecurityCodeError,
    },
  );

  // == Form
  const { values, getInputProps, onSubmit, reset } = useForm({
    initialValues: { code: "" },
  });
  const { code } = values;

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        verifySecurityCode({
          variables: {
            input: values,
          },
        }).finally(reset);
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <InputWrapper label="Security code">
          <PinInput
            type="number"
            length={6}
            oneTimeCode
            mt={4}
            {...getInputProps("code")}
          />
        </InputWrapper>
        <Button
          type="submit"
          disabled={code.length !== 6}
          loading={verifying}
          leftSection={<SecurityCodeIcon />}
        >
          Verify code
        </Button>
      </Stack>
    </Box>
  );
};

export default ICloudVerifySecurityCodeForm;
