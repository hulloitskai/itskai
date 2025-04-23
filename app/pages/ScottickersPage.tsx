import {
  type BoxProps,
  FileButton,
  Image as MantineImage,
  Text,
} from "@mantine/core";

import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";

import AppMeta from "~/components/AppMeta";
import PageLayout from "~/components/PageLayout";
import { stickerify } from "~/helpers/scottickers";
import { useLazyUpload } from "~/helpers/upload";
import { type Image as ImageType, type Scotticker } from "~/types";

import classes from "./ScottickersPage.module.css";

export interface ScottickersPageProps extends SharedPageProps {
  scottickers: Scotticker[];
}

const STICKER_SIZE = 200;

const ScottickersPage: PageComponent<ScottickersPageProps> = ({
  scottickers,
}) => {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("dark");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [creating, setCreating] = useState(false);
  const [upload, { uploading }] = useLazyUpload({
    onCompleted: (blob, file) => {
      setCreating(true);
      // const name = prompt("What's this Scott's name?", basename(file.name));
      void fetchRoute(routes.scottickers.create, {
        descriptor: "create scotticker",
        data: {
          scotticker: {
            name: scottNameFromFileName(file.name),
            image: blob.signed_id,
          },
        },
      })
        .then(() => {
          router.reload({ only: ["scottickers"], async: true });
        })
        // }, (error) => {
        //   // toast.error("Failed to create scotticker", {
        //   //   description: error.message,
        //   // });
        // })
        .finally(() => {
          setCreating(false);
        });
    },
  });

  return (
    <Stack gap="xl">
      <Container size="xs" w="100%">
        <Stack align="center" gap={6}>
          <Title>scottickers</Title>
          <FileButton
            accept="image/png,image/jpeg,image/heic"
            onChange={file => {
              if (file) {
                void upload(file);
              }
            }}
          >
            {props => (
              <Tooltip
                label="Upload a transparent, well-named PNG, i.e. 'happy scott.png'"
                multiline
                maw={280}
                position="bottom"
              >
                <Button
                  leftSection={<UploadIcon />}
                  loading={uploading || creating}
                  radius="xl"
                  {...props}
                >
                  new sticker
                </Button>
              </Tooltip>
            )}
          </FileButton>
        </Stack>
      </Container>
      {isEmpty(scottickers) ? (
        <Container size="xs" w="100%">
          <EmptyCard itemLabel="scottickers" />
        </Container>
      ) : (
        <Group justify="center" wrap="wrap">
          {scottickers.map(({ id, name, image }) => (
            <Stack key={id} gap={4} align="center">
              <StickerImage {...{ image }} />
              <Text size="sm" ff="heading" fw={600}>
                {name}
              </Text>
            </Stack>
          ))}
        </Group>
      )}
    </Stack>
  );
};

ScottickersPage.layout = page => (
  <PageLayout>
    <AppMeta title="scottickers" />
    <Container fluid py="lg">
      {page}
    </Container>
  </PageLayout>
);

export default ScottickersPage;

const scottNameFromFileName = (fileName: string): string => {
  const [name] = fileName.split(".");
  return name ?? "";
};

interface StickerImageProps extends BoxProps {
  image: ImageType;
}

const StickerImage: FC<StickerImageProps> = ({ image, ...otherProps }) => {
  const [src, setSrc] = useState<string>();
  const [blob, setBlob] = useState<Blob>();
  useEffect(() => {
    const img = new Image();
    img.srcset = image.srcset;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const avgDimension = (img.width + img.height) / 2;
      const thickness = (avgDimension / 100) * 3;
      const withWhiteBorder = stickerify(img, thickness, "white");
      const sticker = stickerify(
        withWhiteBorder as any, // eslint-disable-line @typescript-eslint/no-unsafe-argument
        thickness / 6,
        "rgba(0, 0, 0, 0.15)",
      );
      setSrc(sticker.toDataURL());
      sticker.toBlob(blob => {
        if (blob) {
          setBlob(blob);
        }
      });
    };
  }, [image]);
  return (
    <MantineImage
      className={classes.sticker}
      {...{ src }}
      w={STICKER_SIZE}
      h={STICKER_SIZE}
      maw={STICKER_SIZE}
      mah={STICKER_SIZE}
      mod={{ copiable: !!blob }}
      onClick={() => {
        if (!blob) {
          return;
        }
        const item = new ClipboardItem({ [blob.type]: blob });
        navigator.clipboard
          .write([item])
          .then(() => {
            toast.success("Sticker copied :)");
          })
          .catch(error => {
            console.error("Failed to copy image: ", error);
            if (error instanceof Error) {
              toast.error("Failed to copy image", {
                description: error.message,
              });
            } else {
              toast.error("Failed to copy image");
            }
          });
      }}
      {...otherProps}
    />
  );
};
