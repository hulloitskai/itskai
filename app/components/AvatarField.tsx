import type { FC } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import { Image, Input, Text } from "@mantine/core";
import type { InputWrapperProps } from "@mantine/core";

import { AvatarFieldQueryDocument } from "~/helpers/graphql";
import type { AvatarFieldQueryVariables } from "~/helpers/graphql";

import { usePreviousDistinct } from "~/helpers/hooks";
import { uploadFile } from "~/helpers/activestorage";

const AVATAR_FIELD_IMAGE_SIZE = 140;

export type AvatarFieldProps = Omit<
  InputWrapperProps,
  "inputContainer" | "inputWrapperOrder" | "size" | "children"
> & {
  readonly value?: string | null;
  readonly onChange?: (value: string | null) => void;
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
  withAsterisk,
}) => {
  // == Query
  const onError = useApolloAlertCallback("Failed to load avatar");
  const variables = useMemo<AvatarFieldQueryVariables | undefined>(() => {
    if (value) {
      return { signedId: value };
    }
  }, [value]);
  const skip = !value;
  const { data, previousData } = useQuery(AvatarFieldQueryDocument, {
    variables,
    skip,
    onError,
  });
  const queryLoading = !data && !previousData && !skip;

  // == Image Source
  const src = useMemo<string | undefined>(() => {
    if (value && (data || previousData)) {
      const { image } = data ?? previousData ?? {};
      if (image) {
        return image.url;
      } else {
        console.error("Image not found", { signedId: value });
        showAlert({
          title: "Image not found",
          message: "Unable to load image preview for avatar.",
        });
      }
    }
  }, [value, data, previousData]);
  useEffect(() => {
    console.log({ src });
  }, [src]);

  // == Image Loading
  const previousSrc = usePreviousDistinct(src);
  const [imageLoading, setImageLoading] = useState(false);
  useEffect(() => {
    console.log({ src, previousSrc });
    if (src && src !== previousSrc) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [src, previousSrc]);

  // == Loading
  const loading = queryLoading || imageLoading;

  // == Markup
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
      <Stack align="center" spacing={8} py="sm">
        <Box pos="relative">
          <Image
            height={AVATAR_FIELD_IMAGE_SIZE}
            width={AVATAR_FIELD_IMAGE_SIZE}
            m={4}
            styles={{
              root: {
                overflow: "hidden",
                borderRadius: "100%",
              },
              figure: {
                transform: "scale(1.01)",
              },
              placeholder: {
                backgroundColor: "unset",
              },
            }}
            onLoad={() => setImageLoading(false)}
            {...{ src }}
          />
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={files => {
              const file = first(files);
              if (file) {
                uploadFile(file)
                  .then(blob => {
                    if (onChange) {
                      onChange(blob.signed_id);
                    }
                  })
                  .catch(({ message }: Error) => {
                    showAlert({
                      title: "Failed to upload file",
                      message,
                    });
                  });
              }
            }}
            radius="100%"
            pos="absolute"
            inset={0}
            styles={({ colors, transitionTimingFunction, fn }) => {
              const hoveredBackgroundColor = fn.rgba(colors.dark[5], 0.8);
              return {
                root: {
                  ".mantine-LoadingOverlay-root": {
                    borderRadius: "100%",
                  },
                  ...(src && {
                    backgroundColor: "transparent",
                    "&[data-loading]": {
                      backgroundColor: "transparent !important",
                    },
                    "&:not([data-loading]):hover": {
                      backgroundColor: hoveredBackgroundColor,
                      ".mantine-Dropzone-inner": {
                        opacity: 1,
                      },
                    },
                  }),
                },
                inner: {
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: `opacity 150ms ${transitionTimingFunction}`,
                  ...(src && {
                    opacity: 0,
                  }),
                },
              };
            }}
            {...{ loading }}
          >
            <Stack align="center" spacing={8}>
              <Box
                component={PhotoIcon}
                sx={({ colors, primaryColor }) => ({
                  color: colors[primaryColor]![4],
                })}
              />
              <Text size="xs" align="center" lh={1.3} color="gray.5">
                Drag an image or click to upload
              </Text>
            </Stack>
          </Dropzone>
        </Box>
        {src && (
          <Anchor
            component="button"
            size="xs"
            disabled={queryLoading}
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
