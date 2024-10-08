import { ActionIcon, Affix, Dialog, Text } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";

import DocumentIcon from "~icons/basil/document-solid";
import MenuIcon from "~icons/heroicons/bars-3-20-solid";
import FeedbackIcon from "~icons/heroicons/megaphone-20-solid";

export interface ResumeDialogProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  variant?: string;
}

const ResumeDialog: FC<ResumeDialogProps> = ({ variant, ...otherProps }) => {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const togglePosition = 70;
  useEffect(() => {
    if (scroll.y > togglePosition) {
      open();
    } else {
      close();
    }
  }, [scroll, togglePosition, open, close]);

  // == PDF
  const pdfUrl = useMemo(() => {
    let url = "/resume.pdf";
    if (variant) {
      const params = new URLSearchParams();
      params.set("variant", variant);
      url += "?" + params.toString();
    }
    return url;
  }, [variant]);

  return (
    <>
      <Dialog
        withBorder
        withCloseButton
        position={{ bottom: rem(20), right: rem(20) }}
        size="lg"
        transitionProps={{ transition: "slide-up", duration: 250 }}
        {...{ opened }}
        onClose={close}
        {...otherProps}
      >
        <Group gap="sm">
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              Prefer a PDF?
            </Text>
            <Button
              component="a"
              href={pdfUrl}
              leftSection={<DocumentIcon />}
              variant="gradient"
              gradient={{ from: "indigo", to: "pink", deg: 45 }}
              loading={loadingPDF}
              onClick={() => {
                setLoadingPDF(true);
                setTimeout(() => {
                  setLoadingPDF(false);
                }, 6000);
              }}
            >
              {loadingPDF ? "Generating PDF..." : "Generate PDF"}
            </Button>
          </Stack>
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              Does this resume suck?
            </Text>
            <Button
              component="a"
              href="https://www.figma.com/file/QPUcyyc1GiAcRaY0Wh8unz/resume?type=design&mode=design&t=OPIiDsIvXnjxL9ff-1"
              target="_blank"
              rel="noopener noreferrer nofollow"
              leftSection={<FeedbackIcon />}
              variant="gradient"
              gradient={{ from: "pink", to: "orange", deg: 45 }}
            >
              Give feedback
            </Button>
          </Stack>
        </Group>
      </Dialog>
      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <Transition transition="slide-up" duration={250} mounted={!opened}>
          {style => (
            <ActionIcon
              variant="gradient"
              gradient={{ from: "indigo", to: "red", deg: 45 }}
              size="xl"
              radius="xl"
              onClick={open}
              {...{ style }}
            >
              <Text component={MenuIcon} size="xl" />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default ResumeDialog;
