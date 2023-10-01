import type { FC, RefAttributes } from "react";

import { PasswordInput, Progress } from "@mantine/core";
import type { PasswordInputProps } from "@mantine/core";

import { PasswordWithStrengthCheckInputQueryDocument } from "~/helpers/graphql";

export type PasswordWithStrengthCheckInputProps = PasswordInputProps &
  RefAttributes<HTMLInputElement> & {
    readonly onStrengthCheck?: (strength: number) => void;
  };

const PasswordWithStrengthCheckInput: FC<
  PasswordWithStrengthCheckInputProps
> = ({ onStrengthCheck, inputContainer, ...otherProps }) => {
  const { value, error } = otherProps;
  const [debouncedValue] = useDebouncedValue(value, 100);

  // == Query
  const { data, previousData } = useQuery(
    PasswordWithStrengthCheckInputQueryDocument,
    {
      variables: {
        password: typeof debouncedValue === "string" ? debouncedValue : "",
      },
      skip: typeof debouncedValue !== "string",
      onCompleted: ({ passwordStrength }) => {
        if (onStrengthCheck) {
          onStrengthCheck(passwordStrength);
        }
      },
      onError: error => {
        console.error(
          "Failed to check password strength",
          formatJSON({ error }),
        );
      },
    },
  );
  const { passwordStrength = 0.0 } = data ?? previousData ?? {};

  // == Markup
  return (
    <PasswordInput
      inputContainer={children => {
        const inputWithProgress = (
          <>
            {children}
            {!!value && (
              <Progress
                size="xs"
                color={
                  passwordStrength === 1.0
                    ? "green"
                    : passwordStrength > 0.25
                    ? "yellow"
                    : "red"
                }
                value={value ? Math.round(passwordStrength * 100) : 0}
                mt={6}
                mb={error ? 6 : 0}
              />
            )}
          </>
        );
        return inputContainer
          ? inputContainer(inputWithProgress)
          : inputWithProgress;
      }}
      {...otherProps}
    />
  );
};

export default PasswordWithStrengthCheckInput;
