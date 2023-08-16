import type { FC } from "react";
import DocumentIcon from "~icons/heroicons/document-20-solid";
import MenuIcon from "~icons/heroicons/bars-3-20-solid";
import FeedbackIcon from "~icons/heroicons/megaphone-20-solid";

import { ActionIcon, Affix, Dialog, Text } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";

const ResumeDialog: FC = () => {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const togglePosition = 70;
  useEffect(() => {
    if (scroll.y > togglePosition) {
      open();
    } else {
      close();
    }
  }, [scroll.y > togglePosition]);

  return (
    <>
      <Dialog
        withBorder
        withCloseButton
        onClose={close}
        position={{ bottom: rem(20), right: rem(20) }}
        size="lg"
        radius="md"
        transition="slide-up"
        transitionDuration={250}
        {...{ opened }}
      >
        <Group spacing="sm">
          <Stack spacing={2}>
            <Text size="sm" weight={500}>
              Prefer a PDF?
            </Text>
            <Button
              component="a"
              href="/resume.pdf"
              leftIcon={<DocumentIcon />}
              variant="gradient"
              gradient={{ from: "indigo", to: "pink", deg: 45 }}
              onClick={() => {
                setLoadingPDF(true);
              }}
              {...{ loading: loadingPDF }}
            >
              {loadingPDF ? "Generating PDF..." : "Generate PDF"}
            </Button>
          </Stack>
          <Stack spacing={2}>
            <Text size="sm" weight={500}>
              Does this resume suck?
            </Text>
            <Button
              component="a"
              href="https://www.figma.com/file/QPUcyyc1GiAcRaY0Wh8unz/resume?type=design&mode=design&t=OPIiDsIvXnjxL9ff-1"
              target="_blank"
              rel="noopener noreferrer nofollow"
              leftIcon={<FeedbackIcon />}
              variant="gradient"
              gradient={{ from: "pink", to: "orange", deg: 45 }}
            >
              Give Feedback
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
