import type { FC, PropsWithChildren } from "react";

import {
  Body,
  Container,
  Heading,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { PreviewProps } from "@react-email/components";

import "./EmailLayout.css";

export type EmailLayoutProps = PropsWithChildren<{
  readonly emailName?: string;
  readonly header?: string;
  readonly preview?: PreviewProps["children"];
}>;

const EmailLayout: FC<EmailLayoutProps> = ({
  emailName,
  header,
  preview,
  children,
}) => (
  <>
    {!!preview && <Preview>{preview}</Preview>}
    <Body>
      <Box
        component={Container}
        mx="auto"
        px={12}
        py={16}
        {...(emailName && { "data-email": emailName })}
      >
        {!!header && (
          <Box
            component={Heading}
            my={24}
            style={({ headings: { sizes, ...style } }) => ({
              ...sizes.h3,
              ...style,
            })}
          >
            {header}
          </Box>
        )}
        <Box component={Section}>{children}</Box>
        <Box component={Section} mt={40}>
          <Img src="/logo.png" width="32" height="32" />
          <Box
            component={Text}
            style={theme => ({
              color: getThemeColor("dimmed", theme),
              margin: `${rem(4)} 0`,
            })}
          >
            Sent by{" "}
            <Box component={Link} href="/" target="_blank" c="brand.5" fw={800}>
              It&apos;s Kai
            </Box>
            . This email loves you.
          </Box>
        </Box>
      </Box>
    </Body>
  </>
);

export default EmailLayout;
