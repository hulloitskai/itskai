import { type PreviewProps } from "@react-email/components";
import {
  Body,
  Column,
  Hr,
  Img,
  Preview,
  Row,
  Section,
} from "@react-email/components";

import { Heading, Link, Text } from "~/components/email";
import { type DynamicProp, useResolveDynamicProp } from "~/helpers/layout";

import "@mantine/core/styles.css";

export interface EmailLayoutProps<EmailProps extends SharedPageProps>
  extends PropsWithChildren {
  header?: DynamicProp<EmailProps, string>;
  preview?: DynamicProp<EmailProps, PreviewProps["children"]>;
}

const EmailLayout = <EmailProps extends SharedPageProps>({
  header: headerProps,
  preview: previewProp,
  children,
}: EmailLayoutProps<EmailProps>) => {
  const preview = useResolveDynamicProp(previewProp);
  const header = useResolveDynamicProp(headerProps);
  return (
    <>
      {!!preview && <Preview>{preview}</Preview>}
      <Body
        style={{
          color: "var(--mantine-color-text)",
          backgroundColor: "var(--mantine-color-body)",
          margin: 8,
          fontSize: 14,
        }}
      >
        <Container mx="auto" px={12} py={16}>
          {!!header && <Heading className="heading">{header}</Heading>}
          <Section>{children}</Section>
          <Hr style={{ borderColor: "#dddddd", marginTop: 40 }} />
          <Section style={{ marginTop: 28, marginBottom: 20 }}>
            <Row>
              <Column width={32} style={{ paddingRight: 12 }}>
                <Img src="/logo.png" width={32} height={32} />
              </Column>
              <Column>
                <Text style={{ color: "var(--mantine-color-dimmed)" }}>
                  sent by{" "}
                  <Link
                    href={routes.home.show.path()}
                    target="_blank"
                    style={{ fontWeight: 600 }}
                  >
                    it&apos;s kai
                  </Link>
                  . this email loves you.
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </>
  );
};

export default EmailLayout;
