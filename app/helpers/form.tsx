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
  form: Pick<UseFormReturnType<Values>, "watch" | "getValues">,
  field: Field,
) => {
  const [fieldFilled, setFieldFilled] = useState(() =>
    isFilledValue(get(form.getValues(), field)),
  );
  form.watch(field, ({ value }) => {
    setFieldFilled(isFilledValue(value));
  });
  return fieldFilled;
};

export const useFormFilled = <Values,>(
  form: Pick<UseFormReturnType<Values>, "watch" | "getValues">,
  ...fields: LooseKeys<Values>[]
) => {
  const [filledFields, setFilledFields] = useState(() => {
    const values = form.getValues();
    return fields.reduce(
      (fieldsFilled, field) => ({
        ...fieldsFilled,
        [field]: isFilledValue(get(values, field)),
      }),
      {} as Record<LooseKeys<Values>, boolean>,
    );
  });
  useEffect(() => {
    console.log({ filledFields });
  }, [filledFields]);
  fields.forEach(field => {
    form.watch(field, ({ value }) => {
      setFilledFields(filledFields => {
        if (filledFields[field] !== isFilledValue(value)) {
          return {
            ...filledFields,
            [field]: isFilledValue(value),
          };
        }
        return filledFields;
      });
    });
  });
  return useMemo(
    () => Object.values(filledFields).every(identity),
    [filledFields],
  );
};

export const isFilledValue = (value: any): boolean => {
  switch (typeof value) {
    case "string":
      return value !== "";
    case "number":
      return Number.isFinite(value);
    default:
      return !!value;
  }
};

export const useFormDirty = <Values,>(
  form: Pick<UseFormReturnType<Values>, "watch" | "isDirty">,
  ...fields: LooseKeys<Values>[]
) => {
  const [dirtyFields, setDirtyFields] = useState(() => {
    return fields.reduce(
      (fieldsFilled, field) => ({
        ...fieldsFilled,
        [field]: form.isDirty(field),
      }),
      {} as Record<LooseKeys<Values>, boolean>,
    );
  });
  fields.forEach(field => {
    form.watch(field, ({ dirty }) => {
      setDirtyFields(dirtyFields => {
        if (dirtyFields[field] !== dirty) {
          return {
            ...dirtyFields,
            [field]: dirty,
          };
        }
        return dirtyFields;
      });
    });
  });
  return useMemo(
    () => Object.values(dirtyFields).some(identity),
    [dirtyFields],
  );
};
