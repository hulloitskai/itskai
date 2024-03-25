import type { FC } from "react";
import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";
import { uploadFile } from "~/helpers/activestorage";

import type { BoxProps } from "@mantine/core";
import { FileButton } from "@mantine/core";

import { CreatePensieveRecordingMutationDocument } from "~/helpers/graphql";

export type PensieveRecordingCreateFormProps = BoxProps & {
  readonly onCreate: () => void;
};

const PensieveRecordingCreateForm: FC<PensieveRecordingCreateFormProps> = ({
  onCreate,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to create recording");
  const [runMutation, { loading }] = useMutation(
    CreatePensieveRecordingMutationDocument,
    {
      onCompleted: () => {
        showNotice({ message: "Recording created successfully" });
        onCreate();
      },
      onError,
    },
  );

  return (
    <Box {...otherProps}>
      <FileButton
        accept="audio/*"
        multiple
        onChange={files => {
          files.forEach(file => {
            if (file) {
              uploadFile(file).then(blob => {
                runMutation({
                  variables: {
                    input: {
                      audio: { signedId: blob.signed_id },
                    },
                  },
                });
              });
            }
          });
        }}
      >
        {({ onClick }) => (
          <Button
            leftSection={<UploadIcon />}
            fullWidth
            {...{ loading, onClick }}
          >
            Upload recording
          </Button>
        )}
      </FileButton>
    </Box>
  );
};

export default PensieveRecordingCreateForm;
