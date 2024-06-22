import { FileButton, InputWrapper, Text } from "@mantine/core";
import MicrophoneIcon from "~icons/heroicons/microphone-20-solid";
import UploadIcon from "~icons/heroicons/cloud-arrow-up-20-solid";
import StopIcon from "~icons/heroicons/stop-20-solid";

import AppFlash from "~/components/AppFlash";
import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";

export interface CathendantContributePageProps extends SharedPageProps {}

const CathendantContributePage: PageComponent<
  CathendantContributePageProps
> = () => {
  // == Form
  const form = useFetchForm({
    action: routes.cathendantMemos.create,
    method: "post",
    descriptor: "create memo",
    mode: "uncontrolled",
    initialValues: {
      from: "",
      recording: null as File | null,
    },
    transformValues: ({ from, recording }) => {
      const data = new FormData();
      data.append("memo[from]", from);
      data.append("memo[recording]", recording || "");
      return data;
    },
    onSuccess: (data, { reset }) => {
      reset();
      router.visit(routes.cathendants.show.path(), {
        onSuccess: () => {
          showNotice({
            title: "Thank you!",
            message: "Your voice has been added :)",
          });
        },
      });
    },
  });
  const { watch, setFieldValue, getInputProps, errors, submit, processing } =
    form;
  const fromFilled = useFieldFilled(form, "from");
  const recordingFilled = useFieldFilled(form, "recording");
  const [recordingName, setRecordingName] = useState<string>("");
  watch("recording", ({ value }) => {
    if (value) {
      setRecordingName(value.name);
    } else {
      setRecordingName("");
    }
  });

  // == Recording
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const startRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: { noiseSuppression: true } })
      .then(stream => {
        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";
        const recorder = new MediaRecorder(stream, {
          mimeType,
        });
        recorder.ondataavailable = event => {
          recordingChunksRef.current.push(event.data);
        };
        recorder.onstop = () => {
          const fileName = "recording." + mimeType.substring("audio/".length);
          const blob = new Blob(recordingChunksRef.current, {
            type: recorder.mimeType,
          });
          const file = new File([blob], fileName);
          setFieldValue("recording", file);
          recordingChunksRef.current = [];
          recorder.stream.getTracks().forEach(track => {
            track.stop();
          });
          setRecorder(null);
        };
        recorder.start(1000);
        setRecorder(recorder);
      });
  }, [setFieldValue]);
  const stopRecording = useCallback(() => {
    recorder?.stop();
  }, [recorder]);

  // == Playback
  // const player = useGlobalAudioPlayer();
  // const [playerReady, setPlayerReady] = useState(false);
  // const [playerPlaying, setPlayerPlaying] = useState(false);
  // useEffect(() => {
  //   const { recording } = getValues();
  //   if (recording) {
  //     toDataURL(recording).then(url => {
  //       player.load(url);
  //       setPlayerReady(true);
  //     });
  //   }
  // }, [recordingFilled]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack>
      <Title>Contribute to Cathy&apos;s Pendant!</Title>
      <Text>
        My name is Kai. I&apos;m a Cathy friendo! I made a little magic pendant
        for Cathy&apos;s birthday—the idea is, if she taps her phone to the
        pendant, it will play voice messages from her friendos:)
      </Text>
      <Text>Please add your voice to the pendant:</Text>
      <Card withBorder>
        <Box component="form" onSubmit={submit}>
          <Stack gap="xs">
            <TextInput
              {...getInputProps("from")}
              label="your name"
              placeholder="Cathy's Friend"
              required
            />
            <InputWrapper
              label="your voice message"
              error={errors.recording}
              withAsterisk
            >
              <Box mt={1}>
                <Group gap="xs">
                  <Button
                    leftSection={recorder ? <StopIcon /> : <MicrophoneIcon />}
                    mt={1}
                    style={{ flexGrow: 1 }}
                    onClick={() => {
                      if (recorder) {
                        stopRecording();
                      } else {
                        startRecording();
                      }
                    }}
                  >
                    {recorder ? "Stop recording" : "Start recording"}
                  </Button>
                  <FileButton {...getInputProps("recording")} accept="audio/*">
                    {props => (
                      <Button
                        {...props}
                        leftSection={<UploadIcon />}
                        style={{ flexGrow: 1 }}
                      >
                        Pick recording
                      </Button>
                    )}
                  </FileButton>
                </Group>
                {!!recordingName && (
                  <Text size="xs" c="dimmed" mt={1}>
                    Attached: {recordingName}
                  </Text>
                )}
              </Box>
            </InputWrapper>
            <Button
              type="submit"
              variant="outline"
              disabled={!(fromFilled && recordingFilled)}
              loading={processing}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
};

CathendantContributePage.layout = page => (
  <PageLayout>
    <AppFlash />
    <PageContainer size="xs" withGutter>
      {page}
    </PageContainer>
  </PageLayout>
);

export default CathendantContributePage;
