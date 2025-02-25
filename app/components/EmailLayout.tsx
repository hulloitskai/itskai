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

import "./EmailLayout-lowercasing.css";
import "@mantine/core/styles.css";

export interface EmailLayoutProps<EmailProps extends SharedPageProps>
  extends PropsWithChildren {
  header?: DynamicProp<EmailProps, string>;
  preview?: DynamicProp<EmailProps, PreviewProps["children"]>;
}

const transformPreview = (preview: string | string[]): string | string[] => {
  if (Array.isArray(preview)) {
    return preview.map(preview => preview.toLocaleLowerCase());
  }
  return preview.toLocaleLowerCase();
};

const EmailLayout = <EmailProps extends SharedPageProps>({
  header: headerProps,
  preview: previewProp,
  children,
}: EmailLayoutProps<EmailProps>) => {
  const pageProps = usePageProps<EmailProps>();
  const preview = useResolveDynamicProp(previewProp, pageProps);
  const header = useResolveDynamicProp(headerProps, pageProps);
  return (
    <>
      {!!preview && <Preview>{transformPreview(preview)}</Preview>}
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
                  <Link
                    href={routes.home.show.path()}
                    target="_blank"
                    style={{ fontWeight: 600 }}
                  >
                    It&apos;s Kai
                  </Link>
                  . This email loves you.
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
