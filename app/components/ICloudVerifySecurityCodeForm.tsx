import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { VerifyICloudSecurityCodeMutationDocument } from "~/helpers/graphql";

export type ICloudVerifySecurityCodeFormProps = Omit<BoxProps, "children">;

const ICloudVerifySecurityCodeForm: FC<ICloudVerifySecurityCodeFormProps> = ({
  ...otherProps
}) => {
  // == Mutation
  const { getInputProps, isDirty, onSubmit } = useForm({
    initialValues: { code: "" },
  });
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

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        runMutation({
          variables: {
            input: values,
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <TextInput
          label="Security Code"
          placeholder="123456"
          autoComplete="off"
          {...getInputProps("code")}
        />
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Verify Code
        </Button>
      </Stack>
    </Box>
  );
};

export default ICloudVerifySecurityCodeForm;
