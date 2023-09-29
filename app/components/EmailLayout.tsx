import type { FC, PropsWithChildren } from "react";

import {
  Body,
  Container,
  Heading,
  Img,
  Preview,
  Section,
  Text,
  Html,
} from "@react-email/components";
import type { PreviewProps } from "@react-email/components";

import MantineCssVariables from "./MantineCssVariables";
import "./EmailLayout.css";

export type EmailLayoutProps = PropsWithChildren<{
  readonly header?: string;
  readonly preview?: PreviewProps["children"];
}>;

const EmailLayout: FC<EmailLayoutProps> = ({ header, preview, children }) => (
  <Html>
    <MantineCssVariables cssVariablesSelector="body" />
    {!!preview && <Preview>{preview}</Preview>}
    <Body>
      <Box component={Container} mx="auto" px={12} py={16}>
        {!!header && (
          <Box
            component={Heading}
            my={24}
            style={({ headings: { sizes, ...style } }) => ({
              ...sizes.h3,
              ...style,
              fontWeight: 800,
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
            <Box component={Link} href="/" target="_blank" c="brand.5" fw={600}>
              It&apos;s Kai
            </Box>
            . This email loves you.
          </Box>
        </Box>
      </Box>
    </Body>
  </Html>
);

export default EmailLayout;
