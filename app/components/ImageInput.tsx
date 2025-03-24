import { type ImageProps, type InputWrapperProps } from "@mantine/core";
import { Image, Input, rgba, Text } from "@mantine/core";
import { type DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import { useUncontrolled } from "@mantine/hooks";
import { type CSSProperties, useId } from "react";

import PhotoIcon from "~icons/heroicons/photo-20-solid";

import { upload } from "~/helpers/upload";
import { type Image as ImageModel, type Upload } from "~/types";

import classes from "./ImageInput.module.css";
import "@mantine/dropzone/styles.layer.css";

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
  value?: Upload | null;
  defaultValue?: Upload | null;
  previewFit?: CSSProperties["objectFit"];
  onChange?: (value: Upload | null) => void;
  onPreviewChange?: (image: ImageModel | null) => void;
  radius?: ImageProps["radius"];
  center?: boolean;
}

const ImageInput: FC<ImageInputProps> = ({
  center,
  defaultValue,
  previewFit,
  disabled,
  h = 140,
  label,
  labelProps,
  onChange,
  onPreviewChange,
  p,
  pb,
  pl,
  pr,
  pt,
  px,
  py = label ? 6 : undefined,
  radius,
  style,
  value,
  w,
  ...otherProps
}) => {
  // == Controlled input
  const [resolvedValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  // == Load preview image
  const { data, mutate } = useRouteSWR<{
    image: ImageModel | null;
  }>(routes.images.show, {
    descriptor: "load preview image",
    params: resolvedValue ? { signed_id: resolvedValue.signedId } : null,
  });
  const { image } = data ?? {};
  useDidUpdate(() => {
    onPreviewChange?.(image ?? null);
  }, [image]); // eslint-disable-line react-hooks/exhaustive-deps
  useDidUpdate(() => {
    void mutate();
  }, [resolvedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  // == Loading
  const [uploading, setUploading] = useState(false);
  const loading: boolean = uploading || (!!value && !image);

  const inputId = useId();
  return (
    <Input.Wrapper
      labelProps={{ htmlFor: inputId, ...labelProps }}
      {...otherProps}
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
            fit={previewFit}
            radius={radius ?? "var(--mantine-radius-default)"}
            src={image?.src}
            srcSet={image?.src_set}
          />
          <Dropzone
            className={classes.dropzone}
            accept={["image/png", "image/jpeg", "image/webp", "image/gif"]}
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
                    toast.error("failed to upload image", {
                      description: error.message,
                    });
                  })
                  .finally(() => {
                    setUploading(false);
                  });
              }
            }}
            {...{ radius }}
            pos="absolute"
            inset={0}
            inputProps={{ id: inputId }}
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
                fw={500}
                style={{ textAlign: "center" }}
              >
                drag an image or click to upload
              </Text>
            </Stack>
          </Dropzone>
        </Box>
        {!!image && (
          <Anchor
            component="button"
            type="button"
            size="xs"
            fw={500}
            disabled={loading}
            onClick={() => {
              handleChange(null);
            }}
          >
            clear
          </Anchor>
        )}
      </Stack>
    </Input.Wrapper>
  );
};

export default ImageInput;
