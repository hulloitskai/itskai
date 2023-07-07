import scrollIntoView from "scroll-into-view";

import type { UseFormReturnType } from "@mantine/form";
import type {
  GetFieldStatus,
  GetInputPropsType,
  LooseKeys,
} from "@mantine/form/lib/types";

import type { InputFieldError } from "~/helpers/graphql";

export const parseFormErrors = (
  errors: InputFieldError[],
): Record<string, string> => {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  );
};

export const showFormErrorsAlert = (
  errors: Record<string, string>,
  title: string,
): void => {
  const message = formErrorsMessage(errors);
  showAlert({ title, message });
  setTimeout(() => {
    if (isEmpty(document.getElementsByClassName("mantine-Modal-root"))) {
      const element = document.querySelector('[aria-invalid="true"]');
      if (element instanceof HTMLElement) {
        scrollIntoView(element);
      }
    }
  }, 100);
  console.warn(title, formatJSON({ errors }));
};

const formErrorsMessage = (errors: Record<string, string>): string => {
  const messages = Object.values(errors);
  let message = messages.shift();
  if (message) {
    const remainingCount = messages.length;
    if (remainingCount > 0) {
      message += ` (and ${remainingCount} other error${
        remainingCount > 1 ? "s" : ""
      })`;
    }
    if (!message.endsWith(".")) {
      message += ".";
    }
    return message;
  }
  return "An unknown error occurred.";
};

export const useNestedForm = <Values>(
  form: UseFormReturnType<any>,
  path: LooseKeys<Values>,
): Pick<
  UseFormReturnType<Values>,
  | "getInputProps"
  | "setFieldValue"
  | "isTouched"
  | "isDirty"
  | "values"
  | "insertListItem"
  | "removeListItem"
> => {
  const getInputProps = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      options?: {
        type?: GetInputPropsType;
        withError?: boolean;
        withFocus?: boolean;
      },
    ): any =>
      form.getInputProps(`${String(path)}.${String(nestedPath)}`, options),
    [form, path],
  );
  const setFieldValue = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      value: Field extends keyof Values ? Values[Field] : unknown,
    ): any =>
      form.setFieldValue(`${String(path)}.${String(nestedPath)}`, value),
    [form, path],
  );
  const isTouched = useCallback<GetFieldStatus<Values>>(
    nestedPath => form.isTouched(`${String(path)}.${String(nestedPath)}`),
    [form, path],
  );
  const isDirty = useCallback<GetFieldStatus<Values>>(
    nestedPath => form.isDirty(`${String(path)}.${String(nestedPath)}`),
    [form, path],
  );
  const values = useMemo<Values>(() => get(form.values, path), [form]);
  const insertListItem = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      item: unknown,
      index?: number,
    ) =>
      form.insertListItem(`${String(path)}.${String(nestedPath)}`, item, index),
    [form, path],
  );
  const removeListItem = useCallback(
    <Field extends LooseKeys<Values>>(nestedPath: Field, index: number) =>
      form.removeListItem(`${String(path)}.${String(nestedPath)}`, index),
    [form, path],
  );
  return {
    getInputProps,
    setFieldValue,
    isTouched,
    isDirty,
    values,
    insertListItem,
    removeListItem,
  };
};
