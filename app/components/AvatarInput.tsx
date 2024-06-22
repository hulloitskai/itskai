import type { Image as ImageModel } from "~/types";
import { useUncontrolled } from "@mantine/hooks";
import { upload } from "~/helpers/upload";
import { AVATAR_INPUT_IMAGE_SIZE, AVATAR_INPUT_RADIUS } from "~/helpers/avatar";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";

import type { InputWrapperProps } from "@mantine/core";
import { Image, Input, Text, rgba } from "@mantine/core";

import "@mantine/dropzone/styles.layer.css";

import classes from "./AvatarInput.module.css";

export type AvatarValue = { signedId: string };

export interface AvatarInputProps
  extends Omit<
      InputWrapperProps,
      | "defaultValue"
      | "inputContainer"
      | "inputWrapperOrder"
      | "size"
      | "children"
      | "onChange"
    >,
    Pick<DropzoneProps, "disabled"> {
  value?: AvatarValue | null;
  defaultValue?: AvatarValue | null;
  onChange?: (value: AvatarValue | null) => void;
}

const AvatarInput: FC<AvatarInputProps> = ({
  value,
  defaultValue,
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
  const [resolvedValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  // == Uploading
  const [uploading, setUploading] = useState(false);

  // == Preview
  const params = useMemo(() => {
    if (resolvedValue) {
      return {
        signed_id: resolvedValue.signedId,
      };
    }
  }, [resolvedValue]);
  const { data } = useFetch<{
    image: ImageModel;
  }>(routes.images.show, {
    descriptor: "load preview image",
    params: params,
    skip: !resolvedValue,
  });
  const { image } = data ?? {};

  // == Loading
  const loading: boolean = uploading || (!!value && !image);

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
            w={AVATAR_INPUT_IMAGE_SIZE}
            h={AVATAR_INPUT_IMAGE_SIZE}
            radius={AVATAR_INPUT_RADIUS}
            m={4}
            src={image?.src}
            srcSet={image?.srcSet}
          />
          <Dropzone
            accept={["image/png", "image/jpeg"]}
            onDrop={files => {
              const file = first(files);
              if (file) {
                setUploading(true);
                upload(file)
                  .then(blob => {
                    const value = { signedId: blob.signed_id };
                    handleChange(value);
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
            radius={AVATAR_INPUT_RADIUS}
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
            mod={{ "with-src": !!image, disabled }}
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
        {!!image && (
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

export default AvatarInput;
