import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import { useAudioRecorder } from "react-audio-voice-recorder";
import MicIcon from "~icons/heroicons/microphone-20-solid";

import type { JourneysHomePageQuery } from "~/helpers/graphql";

import JourneysAppLayout from "~/components/JourneysAppLayout";
import { randomAnimal } from "~/helpers/animals";

export type JourneyHomePageProps = PagePropsWithData<JourneysHomePageQuery>;

const JourneyHomePage: PageComponent<JourneyHomePageProps> = () => {
  const router = useRouter();

  // == Audio Transcription
  const { isRecording, startRecording, stopRecording, recordingBlob } =
    useAudioRecorder({
      noiseSuppression: true,
      echoCancellation: true,
    });
  const [isTranscribing, setIsTranscribing] = useState(false);
  useEffect(() => {
    if (recordingBlob) {
      setIsTranscribing(true);
      const formData = new FormData();
      const animal = randomAnimal();
      const participantName = ["Anonymous", animal].join(" ");
      formData.set("goal_recording", recordingBlob);
      formData.set("participation[participant_name]", participantName);
      router.post("/sessions", formData, {
        onFinish: () => {
          setIsTranscribing(false);
        },
      });
    }
  }, [recordingBlob]);

  return (
    <Stack align="center" my="xl">
      <Text fw={700}>watchya gonna do for the next hour?</Text>
      <Tooltip
        label="What do you want to get done?"
        opened={isRecording}
        withArrow
      >
        <Button
          leftSection={<MicIcon />}
          onClick={() => {
            if (!isRecording) {
              startRecording();
            } else {
              stopRecording();
            }
          }}
          miw={180}
        >
          {isTranscribing
            ? "Transcribing..."
            : isRecording
            ? "Recording... (click again to end)"
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
    </Stack>
  );
};

JourneyHomePage.layout = buildLayout<JourneyHomePageProps>(
  (page, { data: { viewer } }) => (
    <JourneysAppLayout padding={0} {...{ viewer }}>
      {page}
    </JourneysAppLayout>
  ),
);

export default JourneyHomePage;
