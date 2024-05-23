import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { DateTime } from "luxon";
import { useMediaRecorder } from "~/helpers/mediaRecorder";
import MicIcon from "~icons/heroicons/microphone-20-solid";

import { Text } from "@mantine/core";

import JourneysAppLayout from "~/components/JourneysAppLayout";
import JourneysHomePageSessions from "~/components/JourneysHomePageSessions";

import type { JourneysHomePageQuery } from "~/helpers/graphql";

import classes from "./JourneysHomePage.module.css";

export type JourneysHomePageProps = PagePropsWithData<JourneysHomePageQuery>;

const RECORDING_MIN_SECONDS = 3;
const RECORDING_MAX_SECONDS = 60;

const JourneysHomePage: PageComponent<JourneysHomePageProps> = () => {
  const router = useRouter();

  // == Audio Transcription
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingStartedAt, setRecordingStartedAt] = useState<DateTime | null>(
    null,
  );
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  useEffect(() => {
    if (recordingStartedAt) {
      const interval = setInterval(() => {
        const duration = DateTime.now().diff(recordingStartedAt);
        setRecordingSeconds(duration.as("seconds"));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setRecordingSeconds(0);
    }
  }, [recordingStartedAt]);
  const remainingRecordingSeconds = useMemo(
    () => Math.max(Math.round(RECORDING_MIN_SECONDS - recordingSeconds), 0),
    [recordingSeconds],
  );
  const canEndRecording = remainingRecordingSeconds === 0;
  const { startRecording, stopRecording, status } = useMediaRecorder({
    mediaRecorderOptions: {
      mimeType: "audio/wav",
    },
    onStart: () => {
      setRecordingStartedAt(DateTime.now());
    },
    onStop: (blobUrl, blob) => {
      const recordingTooLong = recordingSeconds > RECORDING_MAX_SECONDS;
      setRecordingStartedAt(null);
      if (!recordingTooLong) {
        const formData = new FormData();
        formData.set("recording", blob);
        router.post("/sessions", formData, {
          onStart: () => {
            setIsTranscribing(true);
          },
          onFinish: () => {
            setIsTranscribing(false);
          },
        });
      } else {
        showAlert({
          title: "Recording is too long",
          message:
            `Please keep the recording to ${RECORDING_MAX_SECONDS} seconds ` +
            "or less.",
        });
      }
    },
  });
  const isRecording = status === "recording";

  return (
    <Stack align="center" my="xl">
      <Title order={3}>watchya gonna do for the next hour?</Title>
      <Tooltip
        label={`Keep going for at least ${remainingRecordingSeconds} more ${
          remainingRecordingSeconds === 1 ? "second" : "seconds"
        }!`}
        withArrow
        opened={isRecording && !canEndRecording}
      >
        <Button
          leftSection={<MicIcon />}
          disabled={isRecording && !canEndRecording}
          onClick={() => {
            if (!isRecording) {
              startRecording();
            } else {
              stopRecording();
            }
          }}
          miw={180}
          className={classes.recordingButton}
        >
          {isTranscribing
            ? "Transcribing..."
            : isRecording
              ? canEndRecording
                ? "Recording... (click to end)"
                : "Recording..."
              : "Record your goal"}
        </Button>
      </Tooltip>
      <Container size="xs" w="100%">
        <Stack align="center" gap={0}>
          <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
            we&apos;ll start a 1-hour timer for you to do ur thing.
            <br />
            send this link to other ppl so they can join your session, to keep u
            motivated & held accountable.
          </Text>
        </Stack>
      </Container>
      <Container size="xs" w="100%">
        <JourneysHomePageSessions />
      </Container>
    </Stack>
  );
};

JourneysHomePage.layout = buildLayout<JourneysHomePageProps>(
  (page, { data: { viewer } }) => (
    <JourneysAppLayout padding={0} {...{ viewer }}>
      {page}
    </JourneysAppLayout>
  ),
);

export default JourneysHomePage;
