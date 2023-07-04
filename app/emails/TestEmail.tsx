import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Column, Row, Section, Text } from "@react-email/components";

import EmailLayout from "~/components/EmailLayout";

import type { TestEmailQuery } from "~/helpers/graphql";

export type TestEmailProps = PagePropsWithData<TestEmailQuery> & {
  readonly model: {
    readonly name: string;
    readonly birthday: string;
  };
};

const TestEmail: PageComponent<TestEmailProps> = ({
  model,
  data: { user },
}) => {
  const { name } = user ?? {};

  // == Markup
  return (
    <>
      <Text>Hi, {name || "anonymous user"}!</Text>
      <Text>This is a test email containing your form submission results:</Text>
      <Box
        component={Section}
        sx={{
          '[data-id="react-email-text"]': {
            margin: `0 !important`,
          },
        }}
      >
        <Row>
          <Column>
            <Box component={Text} sx={{ fontWeight: 600 }}>
              Name
            </Box>
            <Text>{model.name}</Text>
          </Column>
          <Column>
            <Box component={Text} sx={{ fontWeight: 600 }}>
              Birthday
            </Box>
            <Text>{model.birthday}</Text>
          </Column>
        </Row>
      </Box>
    </>
  );
};

TestEmail.layout = buildLayout<TestEmailProps>(page => (
  <EmailLayout header="Test Form Submission">{page}</EmailLayout>
));

export default TestEmail;
