import type { FC, ChangeEventHandler } from "react";

import { PasswordInput, Progress } from "@mantine/core";
import type { PasswordInputProps } from "@mantine/core";

import { PasswordWithStrengthCheckFieldQueryDocument } from "~/queries";

export type PasswordWithStrengthCheckFieldProps = Omit<
  PasswordInputProps,
  "value" | "onChange" | "inputContainer"
> & {
  readonly value: string;
  readonly onChange: ChangeEventHandler<HTMLInputElement>;
  readonly onStrengthCheck?: (strength: number) => void;
};

const PasswordWithStrengthCheckField: FC<
  PasswordWithStrengthCheckFieldProps
> = ({ onStrengthCheck, ...otherProps }) => {
  const { value, error } = otherProps;
  const [debouncedValue] = useDebouncedValue(value, 100);

  // == Query
  const { data, previousData } = useQuery(
    PasswordWithStrengthCheckFieldQueryDocument,
    {
      variables: {
        password: debouncedValue,
      },
      skip: !debouncedValue,
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

export default PasswordWithStrengthCheckField;
