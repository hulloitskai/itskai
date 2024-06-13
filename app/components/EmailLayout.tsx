import type { FC, PropsWithChildren } from "react";

import type { PreviewProps } from "@react-email/components";
import {
  Body,
  Column,
  Hr,
  Img,
  Preview,
  Row,
  Section,
} from "@react-email/components";

import { Heading, Text } from "~/components/email";

import "@mantine/core/styles.css";
import "./EmailLayout-lowercasing.css";

export interface EmailLayoutProps extends PropsWithChildren {
  header?: string;
  preview?: PreviewProps["children"];
}

const EmailLayout: FC<EmailLayoutProps> = ({ header, preview, children }) => (
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
                Sent by{" "}
                <Anchor href="/" target="_blank" c="primary.5" fw={600}>
                  It&apos;s Kai
                </Anchor>
                . This email loves you.
              </Text>
            </Column>
          </Row>
        </Section>
      </Container>
    </Body>
  </>
);

export default EmailLayout;
