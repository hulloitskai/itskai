import type { FC } from "react";
import type { BoxProps } from "@mantine/core";
import { PinInput } from "@mantine/core";

import { VerifyICloudSecurityCodeMutationDocument } from "~/helpers/graphql";

export type ICloudVerifySecurityCodeFormProps = BoxProps;

const ICloudVerifySecurityCodeForm: FC<ICloudVerifySecurityCodeFormProps> = ({
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
      },
      onError,
    },
  );

  // == Form
  const { values, getInputProps, onSubmit } = useForm({
    initialValues: { code: "" },
  });
  const { code } = values;
  const handleSubmit = onSubmit(values => {
    runMutation({
      variables: {
        input: values,
      },
    });
  });

  // == Submission
  useEffect(() => {
    if (code.length === 6) {
      handleSubmit();
    }
  }, [code]);

  return (
    <Box pos="relative" {...otherProps}>
      <Center>
        <PinInput
          type="number"
          length={6}
          oneTimeCode
          {...getInputProps("code")}
        />
      </Center>
      <LoadingOverlay visible={loading} />
    </Box>
  );
};

export default ICloudVerifySecurityCodeForm;
