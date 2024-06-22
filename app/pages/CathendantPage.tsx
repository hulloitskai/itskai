import type { CathendantMemo } from "~/types";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Text } from "@mantine/core";
import PlayIcon from "~icons/heroicons/play-20-solid";
import StopIcon from "~icons/heroicons/stop-20-solid";

import AppFlash from "~/components/AppFlash";
import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";

export interface CathendantPageProps extends SharedPageProps {
  memos: CathendantMemo[];
}

const CathendantPage: PageComponent<CathendantPageProps> = ({ memos }) => {
  const audioPlayer = useGlobalAudioPlayer();
  const [playingMemoId, setPlayingMemoId] = useState<string | null>(null);
  return (
    <Stack>
      <Title>Voices from your friends :)</Title>
      {memos.map(({ id: memoId, from, recordingUrl }) => (
        <Card key={memoId} withBorder>
          <Stack gap="xs">
            <Text>
              From:{" "}
              <Text span inherit fw={600}>
                {from}
              </Text>
            </Text>
            <Button
              size="lg"
              variant={playingMemoId === memoId ? "outline" : "filled"}
              leftSection={
                playingMemoId === memoId ? <StopIcon /> : <PlayIcon />
              }
              onClick={() => {
                if (playingMemoId !== memoId) {
                  setPlayingMemoId(memoId);
                  audioPlayer.load(recordingUrl);
                  audioPlayer.play();
                } else {
                  setPlayingMemoId(null);
                }
              }}
            >
              {playingMemoId === memoId ? "Stop playback" : "Play message"}
            </Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

CathendantPage.layout = page => (
  <PageLayout>
    <AppFlash />
    <PageContainer size="xs" withGutter>
      {page}
    </PageContainer>
  </PageLayout>
);

export default CathendantPage;
