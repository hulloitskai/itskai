import type { FC } from "react";

import type { PasswordInputProps } from "@mantine/core";
import { PasswordInput, Progress } from "@mantine/core";

export interface StrongPasswordInputProps extends PasswordInputProps {
  onStrengthCheck?: (strength: number) => void;
}

const StrongPasswordInput: FC<StrongPasswordInputProps> = ({
  onStrengthCheck,
  inputContainer,
  ...otherProps
}) => {
  const { value, error } = otherProps;
  const [debouncedValue] = useDebouncedValue(value, 200);

  // == Strength Check
  const { data, setValues, submit } = useFetchForm<{ strength: number }>({
    action: routes.passwordStrengthChecks.create,
    method: "post",
    descriptor: "check password strength",
    initialValues: {
      password: value,
    },
    transformValues: values => ({ check: values }),
    onSuccess: ({ strength }) => {
      onStrengthCheck?.(strength);
    },
  });
  const { strength = 0.0 } = data ?? {};
  useEffect(() => {
    setValues({ password: debouncedValue });
    if (debouncedValue) {
      submit();
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

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
                  strength === 1.0
                    ? "green"
                    : strength > 0.25
                      ? "yellow"
                      : "red"
                }
                value={value ? Math.round(strength * 100) : 0}
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

export default StrongPasswordInput;
