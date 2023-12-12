import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import { useAudioRecorder } from "react-audio-voice-recorder";

import type { JourneyHomePageQuery } from "~/helpers/graphql";

import JourneyAppLayout from "~/components/JourneyAppLayout";
import { randomAnimal } from "~/helpers/animals";

export type JourneyHomePageProps = PagePropsWithData<JourneyHomePageQuery>;

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
      <Text>watchya gonna do for the next hour?</Text>
      <Tooltip
        label="What do you want to get done?"
        opened={isRecording}
        withArrow
      >
        <Button
          onClick={() => {
            if (!isRecording) {
              startRecording();
            } else {
              stopRecording();
            }
          }}
          w={180}
        >
          {isTranscribing
            ? "Transcribing..."
            : isRecording
            ? "Recording..."
            : "Start"}
        </Button>
      </Tooltip>
    </Stack>
  );
};

JourneyHomePage.layout = buildLayout<JourneyHomePageProps>(
  (page, { data: { viewer } }) => (
    <JourneyAppLayout padding={0} {...{ viewer }}>
      {page}
    </JourneyAppLayout>
  ),
);

export default JourneyHomePage;
