import type { PasswordInputProps } from "@mantine/core";
import { PasswordInput, Progress } from "@mantine/core";
import { useThrottledValue, useUncontrolled } from "@mantine/hooks";

export interface StrongPasswordInputProps
  extends Omit<PasswordInputProps, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onStrengthCheck?: (strength: number) => void;
  onChange?: (value: string) => void;
}

const StrongPasswordInput: FC<StrongPasswordInputProps> = ({
  onStrengthCheck,
  inputContainer,
  onChange,
  ...otherProps
}) => {
  const { value, defaultValue, error } = otherProps;
  const [resolvedValue, handleChange] = useUncontrolled<string>({
    value,
    defaultValue,
    onChange,
  });
  const throttledValue = useThrottledValue(resolvedValue, 200);

  // == Password strength check
  const initialValues = {
    password: value,
  };
  const { data, setFieldValue, submit } = useFetchForm<
    { strength: number },
    typeof initialValues
  >({
    action: routes.passwordStrengthChecks.create,
    method: "post",
    descriptor: "check password strength",
    initialValues,
    transformValues: values => ({ check: values }),
    onSuccess: ({ strength }) => {
      onStrengthCheck?.(strength);
    },
  });
  const { strength = 0.0 } = data ?? {};
  useEffect(() => {
    setFieldValue("password", throttledValue);
    if (throttledValue) {
      submit();
    }
  }, [throttledValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PasswordInput
      inputContainer={children => {
        const inputWithProgress = (
          <>
            {children}
            {!!throttledValue && (
              <Progress
                size="xs"
                color={
                  strength === 1.0
                    ? "green"
                    : strength > 0.25
                      ? "yellow"
                      : "red"
                }
                value={Math.round(strength * 100)}
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
      onChange={({ currentTarget }) => {
        handleChange(currentTarget.value);
      }}
      {...otherProps}
    />
  );
};

export default StrongPasswordInput;
