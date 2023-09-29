import type { FC } from "react";

import {
  DEFAULT_THEME,
  convertCssVariables,
  deepMerge,
  defaultCssVariablesResolver,
  keys,
  useMantineCssVariablesResolver,
  useMantineStyleNonce,
} from "@mantine/core";
import type { ConvertCSSVariablesInput, MantineTheme } from "@mantine/core";

export type MantineCssVariablesProps = {
  readonly cssVariablesSelector?: string;
};

interface GetMergedVariablesInput {
  theme: MantineTheme;
  generator?(theme: MantineTheme): ConvertCSSVariablesInput;
}

const defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);

const getMergedVariables = ({ theme, generator }: GetMergedVariablesInput) => {
  const defaultResolver = defaultCssVariablesResolver(theme);
  const providerGenerator = generator?.(theme);
  return providerGenerator
    ? deepMerge(defaultResolver, providerGenerator)
    : defaultResolver;
};

const getColorSchemeCssVariables = (selector: string) => {
  return `
  ${selector}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${selector}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
};

const removeDefaultVariables = (
  input: ConvertCSSVariablesInput,
): ConvertCSSVariablesInput => {
  const cleaned: ConvertCSSVariablesInput = {
    variables: {},
    light: {},
    dark: {},
  };
  keys(input.variables).forEach(key => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key]!;
    }
  });
  keys(input.light).forEach(key => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key]!;
    }
  });
  keys(input.dark).forEach(key => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key]!;
    }
  });
  return cleaned;
};

const MantineCssVariables: FC<MantineCssVariablesProps> = ({
  cssVariablesSelector = ":root",
}) => {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = cssVariablesSelector === ":root";
  const cleanedVariables = shouldCleanVariables
    ? removeDefaultVariables(mergedVariables)
    : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);
  if (css) {
    return (
      <Head>
        <style
          data-mantine-styles
          dangerouslySetInnerHTML={{
            __html: `${css}${getColorSchemeCssVariables(cssVariablesSelector)}`,
          }}
          {...(nonce && { nonce: nonce() })}
          {...{ inertia: true }}
        />
      </Head>
    );
  }
  return null;
};

export default MantineCssVariables;
