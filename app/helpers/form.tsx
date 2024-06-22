import type { UseFormReturnType } from "@mantine/form";
import type { LooseKeys, _TransformValues } from "@mantine/form/lib/types";
import { sentencify } from "./inflect";

export const showFormErrorsAlert = <
  Values,
  TransformValues extends _TransformValues<Values>,
>(
  form: Pick<
    UseFormReturnType<Values, TransformValues>,
    "errors" | "getInputNode"
  >,
  title: string,
): void => {
  let firstErrorMessage = first(Object.values(form.errors));
  if (typeof firstErrorMessage === "string") {
    firstErrorMessage = sentencify(firstErrorMessage);
  }
  showAlert({
    title,
    message: firstErrorMessage ?? "An unknown error occurred.",
  });
  const firstErrorPath = first(Object.keys(form.errors));
  if (firstErrorPath) {
    const input = form.getInputNode(firstErrorPath);
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const useFieldFilled = <Values, Field extends LooseKeys<Values>>(
  form: Pick<UseFormReturnType<Values>, "watch">,
  field: Field,
) => {
  const [fieldFilled, setFieldFilled] = useState(false);
  form.watch(field, ({ value }) => {
    setFieldFilled(isFilledValue(value));
  });
  return fieldFilled;
};

export const useFieldsFilled = <Values,>(
  form: Pick<UseFormReturnType<Values>, "watch">,
  ...fields: LooseKeys<Values>[]
) => {
  const [filledFields, setFilledFields] = useState(() =>
    fields.reduce(
      (fieldsFilled, field) => ({ ...fieldsFilled, [field]: false }),
      {} as Record<LooseKeys<Values>, boolean>,
    ),
  );
  fields.forEach(field => {
    form.watch(field, ({ value }) => {
      setFilledFields(filledFields => ({
        ...filledFields,
        [field]: isFilledValue(value),
      }));
    });
  });
  return useMemo(
    () => Object.values(filledFields).every(identity),
    [filledFields],
  );
};

const isFilledValue = (value: any): boolean => {
  switch (typeof value) {
    case "string":
      return value !== "";
    case "number":
      return Number.isFinite(value);
    default:
      return !!value;
  }
};
