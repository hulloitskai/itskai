import { Column, Row, Section } from "@react-email/components";

import { Text } from "~/components/email";
import EmailLayout from "~/components/EmailLayout";
import { type EmailComponent } from "~/helpers/inertia";
import { type User } from "~/types";

import classes from "./TestEmail.module.css";

export interface TestEmailProps {
  model: {
    name: string;
    birthday: string;
  };
  user: User | null;
}

const TestEmail: EmailComponent<TestEmailProps> = ({ model, user }) => {
  const { name } = user ?? {};
  return (
    <>
      <Text>Hi, {name ?? "anonymous user"}!</Text>
      <Text>This is a test email containing your form submission results:</Text>
      <br />
      <Section className={classes.results}>
        <Row>
          <Column>
            <Text style={{ fontWeight: 600 }}>Name</Text>
            <Text>{model.name}</Text>
          </Column>
          <Column>
            <Text style={{ fontWeight: 600 }}>Birthday</Text>
            <Text>{model.birthday}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
};

TestEmail.layout = page => (
  <EmailLayout header="Test form submission">{page}</EmailLayout>
);

export default TestEmail;
