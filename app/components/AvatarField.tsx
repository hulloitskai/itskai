import type { FC } from "react";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import { Dropzone } from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";

import { Image, Input, Text, rgba } from "@mantine/core";
import type { InputWrapperProps } from "@mantine/core";

import { AvatarFieldQueryDocument } from "~/helpers/graphql";
import type { Maybe, UploadInput } from "~/helpers/graphql";
import type { AvatarFieldQueryVariables } from "~/helpers/graphql";

import "@mantine/dropzone/styles.layer.css";

import { uploadFile } from "~/helpers/activestorage";

import classes from "./AvatarField.module.css";

const AVATAR_FIELD_IMAGE_SIZE = 140;
const AVATAR_FIELD_RADIUS = 10000;

export type AvatarFieldProps = Omit<
  InputWrapperProps,
  "inputContainer" | "inputWrapperOrder" | "size" | "children" | "onChange"
> &
  Pick<DropzoneProps, "disabled"> & {
    readonly value?: Maybe<UploadInput>;
    readonly onChange?: (value: Maybe<UploadInput>) => void;
  };

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
  // == Value
  const previousValue = usePrevious(value);
  const valueChanged = useMemo(
    () => !isEqual(value, previousValue),
    [value, previousValue],
  );

  // == Uploading
  const [uploading, setUploading] = useState(false);

  // == Loading avatar
  const onLoadAvatarError = useApolloAlertCallback("Failed to load avatar");
  const variables = useMemo<AvatarFieldQueryVariables | undefined>(() => {
    if (value) {
      return value;
    }
  }, [value]);
  const skipQuery = !value;
  const { data: avatarData, loading: avatarLoading } = useQuery(
    AvatarFieldQueryDocument,
    {
      variables,
      skip: skipQuery,
      onError: onLoadAvatarError,
    },
  );

  // == Image
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (value) {
      if (avatarData) {
        const { image } = avatarData ?? {};
        if (image) {
          setSrc(image.src);
        } else {
          console.error("Image not found", formatJSON({ signedId: value }));
          showAlert({
            title: "Image not found",
            message: "Unable to load image preview for avatar.",
          });
        }
      }
    } else {
      setSrc("");
    }
  }, [value, avatarData]);

  // == Loading
  const loading = uploading || ((!src || valueChanged) && avatarLoading);

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
            {...{ src }}
          />
          <Dropzone
            accept={["image/png", "image/jpeg"]}
            onDrop={files => {
              const file = first(files);
              if (file) {
                setUploading(true);
                uploadFile(file)
                  .then(blob => {
                    if (onChange) {
                      const value: UploadInput = {
                        signedId: blob.signed_id,
                      };
                      onChange(value);
                    }
                  })
                  .catch(({ message }: Error) => {
                    showAlert({
                      title: "Failed to upload file",
                      message,
                    });
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
            mod={{ "with-src": !!src, disabled }}
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
        {src && (
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
