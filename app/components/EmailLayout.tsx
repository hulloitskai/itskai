import type { FC, PropsWithChildren } from "react";

import { Body, Column, Hr, Preview, Row } from "@react-email/components";
import { Container, Section, Text, Heading, Img } from "./email";
import type { PreviewProps } from "@react-email/components";

import "./EmailLayout.css";

export type EmailLayoutProps = PropsWithChildren<{
  readonly header?: string;
  readonly preview?: PreviewProps["children"];
}>;

const EmailLayout: FC<EmailLayoutProps> = ({ header, preview, children }) => (
  <>
    {!!preview && <Preview>{preview}</Preview>}
    <Body>
      <Container mx="auto" px={12} py={16}>
        {!!header && (
          <Heading
            my="var(--mantine-spacing-xl) !important"
            style={({ headings: { sizes, ...style } }) => ({
              ...sizes.h3,
              ...style,
              fontWeight: 800,
            })}
          >
            {header}
          </Heading>
        )}
        <Section>{children}</Section>
        <Hr style={{ borderColor: "#dddddd", marginTop: 40 }} />
        <Section mt={28} mb={20}>
          <Row>
            <Column width="min-content">
              <Img src="/logo.png" w="32" h="32" />
            </Column>
            <Column>
              <Text c="dimmed" inline>
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
