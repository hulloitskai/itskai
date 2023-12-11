import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { RingProgress, Text } from "@mantine/core";
import { useAudioRecorder } from "react-audio-voice-recorder";

import type { JourneyHomePageQuery } from "~/helpers/graphql";

import JourneyAppLayout from "~/components/JourneyAppLayout";

const MAX_COUNT = 3600;

export type JourneyHomePageProps = PagePropsWithData<JourneyHomePageQuery> & {
  transcriptionUrl: string;
};

const JourneyHomePage: PageComponent<JourneyHomePageProps> = ({
  transcriptionUrl,
  csrf,
}) => {
  // == Status
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCount(count => Math.min(count + 1, MAX_COUNT));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setCount(0);
    }
  }, [isActive]);
  const time = useMemo(
    () => Duration.fromObject({ seconds: MAX_COUNT - count }).toFormat("mm:ss"),
    [count],
  );

  // == Audio Transcription
  const { isRecording, startRecording, stopRecording, recordingBlob } =
    useAudioRecorder({
      noiseSuppression: true,
      echoCancellation: true,
    });
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  useEffect(() => {
    if (recordingBlob) {
      try {
        setIsTranscribing(true);
        const formData = new FormData();
        formData.append("recording", recordingBlob);
        fetch(transcriptionUrl, {
          method: "POST",
          headers: {
            "X-CSRF-Token": csrf.token,
          },
          body: formData,
        })
          .then(response => response.text())
          .then(transcription => {
            setTranscription(transcription);
            setIsActive(true);
          });
      } finally {
        setIsTranscribing(false);
      }
    } else {
      setIsTranscribing(false);
      setTranscription("");
    }
  }, [recordingBlob]);

  return (
    <Stack align="center" my="xl">
      <Text>watchya gonna do for the next hour?</Text>
      <RingProgress
        sections={[
          {
            color: "primary",
            value: (count / MAX_COUNT) * 100,
          },
        ]}
        label={
          <Center>
            <Text span fw={700}>
              {time}
            </Text>
          </Center>
        }
        size={240}
        thickness={7}
        roundCaps
      />
      <Tooltip
        label="What do you want to get done?"
        opened={isRecording}
        withArrow
      >
        <Button
          onClick={() => {
            if (isRecording) {
              stopRecording();
            } else if (!isActive) {
              startRecording();
            } else {
              setIsActive(false);
              setTranscription("");
            }
          }}
          w={180}
        >
          {isActive
            ? "Stop"
            : isTranscribing
            ? "Transcribing..."
            : isRecording
            ? "Recording..."
            : "Start"}
        </Button>
      </Tooltip>
      {!!transcription && <Text>{transcription}</Text>}
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
