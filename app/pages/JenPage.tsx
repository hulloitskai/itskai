import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import type { HomePageQuery } from "~/queries";

export type JenPageProps = {
  readonly data: HomePageQuery;
};

const JenPage: PageComponent = () => {
  return (
    <Container size="xs" my="xl">
      <Text>
        Hi Jen!
        <br />
        <br />
        I&apos;ve known you for about a month now, and I gotta say, the
        highlight of my November was hands down talking to you and getting to
        know you better and sharing my life with you. I&apos;m really thankful
        that I bumped into you!
        <br />
        <br />
        It&apos;s been a long time since I felt cared about a lot by someone,
        and had the feeling of mattering to someone. I really appreciate how you
        check in on me regularly throughout the day, and making sure I eat and
        stuff 😭! Your texts give me the warm fuzzies, and they help me get
        through a lot of tough moments. Life is easier when there&apos;s
        somebdoy on your team, and you show me that you&apos;re on my team,
        every single day.
        <br />
        <br />
        I really appreciate how much you make me feel heard. I know that I can
        be guilty of writing way too much sometimes; when I&apos;m feeling a
        lot, I write tons. And I never really expect people to read my
        essay-texts because, well, truthfully—it&apos;s a lot! But you always
        do. You read my big essay-texts, and you empathize with me, and you tell
        me that I&apos;m a good kid and that everything will be okay. You are
        present with me through my tantrums, my big upsets about life. You make
        me feel heard, understood, and you help me realize that it is safe to
        share myself with you—even the thoughts and feelings I have trouble
        believing are okay to share with anyone. And having someone that I can
        talk to with this amount of honesty means a lot to me. I don&apos;t
        always get to be 100% real with someone, and it has been a blessing to
        be able to 100% real with you every single day this past month.
        <br />
        <br />
        And lastly, I want to thank you for sharing your life and thoughts and
        feelings with me too! I don&apos;t always get a chance to care about
        someone a lot; most people in my life don&apos;t really accept that kind
        of care, for whatever reason. I am always happy to receive you on your
        dark days and listen to your dark moments, because you matter a lot to
        me and having the opportunity to care about you means that I can express
        this! Like, regularly! Loving somebody like that, and feeling that
        tenderness and connectedness with them, is probably one of the best
        parts of being alive for me, and I get to do that with you all the time
        :) <br />
        <br />
        Ever since meeting you, I have been happier, less overwhelmed;{" "}
        <Text italic span>
          lighter
        </Text>
        , even, somehow. Your care and love has impacted my life a lot, in so
        many ways. So thank you for being here, thank you for being you, and
        thank you for your love. It matters, more than I can express in one
        letter.
        <br />
        <br />
        Anyways, I hope you had a great birthday today! There&apos;s a lot to
        celebrate about you, it&apos;s great that we get to have a day to do
        that :)
        <br />
        <br />
        Until next time,
        <br />
        Kai
        <br />
        <br />
        p.s. Say hi to Saffron for me! woofs!
      </Text>
    </Container>
  );
};

JenPage.layout = layoutWithData<JenPageProps>((page, { viewer }) => (
  <AppLayout withContainer={false} {...{ viewer }}>
    {page}
  </AppLayout>
));

export default JenPage;
