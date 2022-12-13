import type { FormErrors } from "@mantine/form";
import type { InputFieldError } from "~/queries";

export const formErrors = (errors: InputFieldError[]): FormErrors => {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  );
};
