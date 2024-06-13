import type { FC } from "react";
import type { Image as ImageModel } from "~/types";
import { upload } from "~/helpers/upload";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";

import type { InputWrapperProps } from "@mantine/core";
import { Image, Input, Text, rgba } from "@mantine/core";

import "@mantine/dropzone/styles.layer.css";

import { AVATAR_FIELD_IMAGE_SIZE, AVATAR_FIELD_RADIUS } from "~/helpers/avatar";
import classes from "./AvatarField.module.css";

export type AvatarValue = { signedId: string };

export interface AvatarFieldProps
  extends Omit<
      InputWrapperProps,
      "inputContainer" | "inputWrapperOrder" | "size" | "children" | "onChange"
    >,
    Pick<DropzoneProps, "disabled"> {
  value?: AvatarValue;
  onChange?: (value: AvatarValue | null) => void;
}

const AvatarField: FC<AvatarFieldProps> = ({
  value,
  onChange,
  variant,
  labelElement,
  label,
  labelProps,
  description,
  descriptionProps,
  error,
  errorProps,
  required,
  disabled,
  withAsterisk,
  style,
}) => {
  // == Uploading
  const [uploading, setUploading] = useState(false);

  // == Preview
  const { data: previewData, fetching: previewFetching } = useFetch<{
    image: ImageModel;
  }>(routes.images.show, {
    descriptor: "load preview image",
    params: value,
    skip: !value,
  });
  const { image: previewImage } = previewData ?? {};

  // == Loading
  const loading: boolean =
    uploading || (!!value && !previewImage && previewFetching);

  return (
    <Input.Wrapper
      {...{
        variant,
        labelElement,
        label,
        labelProps,
        description,
        descriptionProps,
        error,
        errorProps,
        required,
        withAsterisk,
      }}
    >
      <Stack align="center" gap={8} py="sm">
        <Box pos="relative">
          <Image
            w={AVATAR_FIELD_IMAGE_SIZE}
            h={AVATAR_FIELD_IMAGE_SIZE}
            radius={AVATAR_FIELD_RADIUS}
            m={4}
            src={previewImage?.src}
            srcSet={previewImage?.srcSet}
          />
          <Dropzone
            accept={["image/png", "image/jpeg"]}
            onDrop={files => {
              const file = first(files);
              if (file) {
                setUploading(true);
                upload(file)
                  .then(blob => {
                    if (onChange) {
                      const value = { signedId: blob.signed_id };
                      onChange(value);
                    }
                  })
                  .catch((error: Error) => {
                    showAlert({
                      title: "Failed to upload file",
                      message: error.message,
                    });
                    console.error("Failed to upload file", error);
                  })
                  .finally(() => {
                    setUploading(false);
                  });
              }
            }}
            radius={AVATAR_FIELD_RADIUS}
            pos="absolute"
            inset={0}
            classNames={{
              root: classes.dropzone,
              inner: classes.dropzoneInner,
            }}
            style={[
              style,
              ({ colors }) => ({
                "--af-dropzone-backdrop": rgba(colors.dark[5], 0.8),
              }),
            ]}
            mod={{ "with-src": !!previewImage, disabled }}
            {...{ loading, disabled }}
          >
            <Stack align="center" gap={8}>
              <Box component={PhotoIcon} className={classes.dropzoneIcon} />
              <Text
                size="xs"
                c="dark.1"
                lh={1.3}
                style={{ textAlign: "center" }}
              >
                Drag an image or click to upload
              </Text>
            </Stack>
          </Dropzone>
        </Box>
        {!!previewImage && (
          <Anchor
            component="button"
            type="button"
            size="xs"
            disabled={loading}
            onClick={() => {
              if (onChange) {
                onChange(null);
              }
            }}
          >
            Clear image
          </Anchor>
        )}
      </Stack>
    </Input.Wrapper>
  );
};

export default AvatarField;
