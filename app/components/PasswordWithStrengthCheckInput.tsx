import type { FC, RefAttributes } from "react";

import { PasswordInput, Progress } from "@mantine/core";
import type { PasswordInputProps } from "@mantine/core";

import { PasswordWithStrengthCheckInputQueryDocument } from "~/queries";

export type PasswordWithStrengthCheckInputProps = Omit<
  PasswordInputProps,
  "inputContainer"
> &
  RefAttributes<HTMLInputElement> & {
    readonly onStrengthCheck?: (strength: number) => void;
  };

const PasswordWithStrengthCheckInput: FC<
  PasswordWithStrengthCheckInputProps
> = ({ onStrengthCheck, ...otherProps }) => {
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
    },
  );
  const { passwordStrength = 0.0 } = data ?? previousData ?? {};

  // == Markup
  return (
    <PasswordInput
      inputContainer={children => (
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
      )}
      {...otherProps}
    />
  );
};

export default PasswordWithStrengthCheckInput;
