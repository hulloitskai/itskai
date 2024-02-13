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
  // == Mutation
  const onError = useApolloAlertCallback("Failed to verify security code");
  const [runMutation, { loading }] = useMutation(
    VerifyICloudSecurityCodeMutationDocument,
    {
      onCompleted: () => {
        closeAllModals();
        showNotice({ message: "Successfully authenticated with iCloud." });
        onVerify();
      },
      onError,
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
        runMutation({
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
          leftSection={<SecurityCodeIcon />}
          disabled={code.length !== 6}
          {...{ loading }}
        >
          Verify code
        </Button>
      </Stack>
    </Box>
  );
};

export default ICloudVerifySecurityCodeForm;
