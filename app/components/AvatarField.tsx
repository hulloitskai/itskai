import type { FC } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import PhotoIcon from "~icons/heroicons/photo-20-solid";

import { Image, Input, Text } from "@mantine/core";
import type { InputWrapperProps } from "@mantine/core";

import { uploadFile } from "~/helpers/activestorage";
import { AvatarFieldQueryDocument } from "~/helpers/graphql";
import { ApolloError } from "@apollo/client";
import { useHover } from "@mantine/hooks";

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
  const { ref, hovered } = useHover();
  const client = useApolloClient();
  const size = 140;

  // == Image Src
  const valueIsSrc = useMemo(() => (value ? isUrl(value) : false), [value]);
  const [src, setSrc] = useState(() => (valueIsSrc ? value : undefined));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (value) {
      if (valueIsSrc) {
        setSrc(value);
      } else {
        setLoading(true);
        client
          .query({
            query: AvatarFieldQueryDocument,
            variables: { signedId: value },
          })
          .then(({ data: { image } }) => {
            if (image) {
              setSrc(image.url);
            } else {
              setLoading(false);
              console.error("Image not found", { signedId: value });
              showAlert({
                title: "Image not found",
                message: "Unable to load image preview for avatar.",
              });
            }
          })
          .catch((error: ApolloError) => {
            const title = "Failed to load avatar";
            const message = formatApolloError(error);
            console.error(title, { error });
            showAlert({ title, message });
            setLoading(false);
          });
      }
    } else {
      setSrc(undefined);
    }
  }, [value, valueIsSrc]);

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
        <Box pos="relative" sx={{ borderRadius: "100%" }} {...{ ref }}>
          <Image
            height={size}
            width={size}
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
            onLoad={() => {
              setLoading(false);
            }}
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
              const hoveredBackgroundColor = fn.rgba(colors.dark[5], 0.9);
              return {
                root: {
                  ...(src &&
                    !loading && {
                      backgroundColor: hovered
                        ? hoveredBackgroundColor
                        : "transparent",
                      "&:hover": {
                        backgroundColor: hoveredBackgroundColor,
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
                  ...(src &&
                    !loading && {
                      opacity: hovered ? 1 : 0,
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
        {src && !loading && (
          <Anchor
            component="button"
            size="xs"
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
