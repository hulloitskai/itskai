import { FormErrors } from "@mantine/form";
import { ValidationError } from "~/queries";

export const formErrors = (errors: ValidationError[]): FormErrors => {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  );
};
