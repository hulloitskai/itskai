import type { Image as ImageModel } from "~/types";
import { upload } from "~/helpers/upload";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";

import type { ImageProps, InputWrapperProps } from "@mantine/core";
import { Image, Input, Text, rgba } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

import "@mantine/dropzone/styles.layer.css";

import classes from "./ImageInput.module.css";

export type ImageValue = { signedId: string };

export interface ImageInputProps
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
  value?: ImageValue | null;
  defaultValue?: ImageValue | null;
  onChange?: (value: ImageValue | null) => void;
  radius?: ImageProps["radius"];
  center?: boolean;
}

const ImageInput: FC<ImageInputProps> = ({
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
  w,
  h = 140,
  pl,
  pr,
  pb,
  pt,
  px,
  py = 2,
  p,
  radius = "md",
  center,
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
      <Stack
        align={w ? "center" : "stretch"}
        gap={8}
        {...(!!w && { w: "min-content" })}
        {...(center && { mx: "auto" })}
        {...{ pl, pr, pb, pt, px, py, p }}
      >
        <Box {...{ w, h }} p={4} pos="relative">
          <Image
            w="100%"
            h="100%"
            {...{ radius }}
            src={image?.src}
            srcSet={image?.srcSet}
          />
          <Dropzone
            accept={["image/png", "image/jpeg"]}
            multiple={false}
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
            radius={radius}
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
            Clear
          </Anchor>
        )}
      </Stack>
    </Input.Wrapper>
  );
};

export default ImageInput;
