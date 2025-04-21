import {
  ActionIcon,
  FileButton,
  Group,
  Image as MantineImage,
  Textarea,
} from "@mantine/core";

import PhotoIcon from "~icons/heroicons/photo-20-solid";

import { useLazyUpload } from "~/helpers/upload";
import { type Image } from "~/types";

import EmojiPopover from "./EmojiPopover";

import classes from "./AdminStatusForm.module.css";

export interface AdminStatusFormProps extends BoxProps {
  onStatusCreated: () => void;
}

const AdminStatusForm: FC<AdminStatusFormProps> = ({
  onStatusCreated,
  ...otherProps
}) => {
  // == Form
  const { submit, getInputProps, setFieldValue, values, submitting } = useForm({
    action: routes.adminStatuses.create,
    descriptor: "create status",
    initialValues: {
      emoji: "",
      text: "",
      image: null as { signed_id: string } | null,
    },
    transformValues: ({ emoji, image, ...values }) => ({
      status: {
        emoji: emoji || null,
        image: image?.signed_id ?? "",
        ...values,
      },
    }),
    onSuccess: (data, { reset }) => {
      reset();
      onStatusCreated();
    },
  });
  const filled = useFieldsFilled(values, "text");

  // == Image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadImage, { uploading: uploadingImage }] = useLazyUpload({
    onCompleted: blob => {
      setFieldValue("image", pick(blob, "signed_id"));
    },
  });
  useEffect(() => {
    if (imageFile) {
      void uploadImage(imageFile);
    }
  }, [imageFile, uploadImage]);
  const { data: imageData } = useRouteSWR<{ image: Image }>(
    routes.images.show,
    {
      descriptor: "load image",
      params: values.image ? pick(values.image, "signed_id") : null,
    },
  );
  const { image } = imageData ?? {};

  return (
    <Stack gap="xs" {...otherProps}>
      <form onSubmit={submit}>
        <Group align="start" gap="xs">
          <Textarea
            {...getInputProps("text")}
            placeholder="new update??!"
            leftSection={
              <EmojiPopover
                middlewares={{ flip: { fallbackAxisSideDirection: "end" } }}
                onEmojiClick={({ emoji }) => {
                  setFieldValue("emoji", emoji);
                }}
              >
                {({ open }) => (
                  <ActionIcon
                    size="sm"
                    radius="xl"
                    onClick={() => {
                      if (values.emoji) {
                        setFieldValue("emoji", "");
                      } else {
                        open();
                      }
                    }}
                  >
                    {values.emoji || <EmojiIcon />}
                  </ActionIcon>
                )}
              </EmojiPopover>
            }
            rightSection={
              <FileButton accept="image/*" onChange={setImageFile}>
                {({ onClick }) => (
                  <ActionIcon
                    size="sm"
                    radius="sm"
                    loading={uploadingImage}
                    {...{ onClick }}
                  >
                    <PhotoIcon />
                  </ActionIcon>
                )}
              </FileButton>
            }
            required
            withAsterisk={false}
            autosize
            minRows={1}
            styles={{
              root: { flexGrow: 1 },
              section: { alignItems: "start", paddingTop: rem(7) },
            }}
            onKeyDown={event => {
              if (event.metaKey && event.key === "Enter") {
                event.preventDefault();
                submit();
              }
            }}
          />
          <ActionIcon
            variant="light"
            type="submit"
            size={38}
            disabled={!filled}
            loading={submitting}
          >
            <SendIcon />
          </ActionIcon>
        </Group>
      </form>
      {image && (
        <MantineImage
          className={classes.image}
          srcSet={image.srcset}
          src={image.src}
          fit="contain"
        />
      )}
    </Stack>
  );
};

export default AdminStatusForm;
