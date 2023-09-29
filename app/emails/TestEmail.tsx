import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Column, Row, Section } from "@react-email/components";
import { Text } from "@mantine/core";

import EmailLayout from "~/components/EmailLayout";

import classes from "./TestEmail.module.css";

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
  return (
    <>
      <Text>Hi, {name || "anonymous user"}!</Text>
      <Text>This is a test email containing your form submission results:</Text>
      <Box className={classes.results} component={Section}>
        <Row>
          <Column>
            <Text fw={600}>Name</Text>
            <Text>{model.name}</Text>
          </Column>
          <Column>
            <Text fw={600}>Birthday</Text>
            <Text>{model.birthday}</Text>
          </Column>
        </Row>
      </Box>
    </>
  );
};

TestEmail.layout = buildLayout<TestEmailProps>(page => (
  <EmailLayout header="Test form submission">{page}</EmailLayout>
));

export default TestEmail;
