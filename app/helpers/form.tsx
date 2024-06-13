import type { ReactNode } from "react";
import type { FormErrors, LooseKeys } from "@mantine/form/lib/types";
import scrollIntoView from "scroll-into-view";

export const useRequiredFieldsFilled = <
  Values,
  Field extends LooseKeys<Values>,
>(
  values: Values,
  ...fields: Field[]
): boolean => {
  return useMemo(
    () =>
      fields.every(field => {
        const value = get(values, field);
        switch (typeof value) {
          case "number":
            return value === 0 || !!value;
          default:
            return !!value;
        }
      }),
    [values], // eslint-disable-line react-hooks/exhaustive-deps
  );
};

export const showFormErrorsAlert = (
  errors: FormErrors,
  title: string,
): void => {
  const message = formErrorsMessage(errors);
  showAlert({ title, message });
  scrollFirstFormErrorIntoView();
};

const formErrorsMessage = (errors: FormErrors): ReactNode => {
  const messages = Object.values(errors).flat();
  let message = messages.shift();
  if (message) {
    const remainingCount = messages.length;
    if (remainingCount > 0) {
      message = (
        <>
          {message} (and {remainingCount} other error
          {remainingCount > 1 ? "s" : ""}).
        </>
      );
    }
    return message;
  }
  return "An unknown error occurred.";
};

export const scrollFirstFormErrorIntoView = () => {
  setTimeout(() => {
    if (isEmpty(document.getElementsByClassName("mantine-Modal-root"))) {
      const element = document.querySelector('[aria-invalid="true"]');
      if (element instanceof HTMLElement) {
        scrollIntoView(element);
      }
    }
  }, 100);
};
