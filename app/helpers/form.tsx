import { type UseFormReturnType } from "@mantine/form";
import { type _TransformValues, type LooseKeys } from "@mantine/form/lib/types";
import scrollIntoView from "scroll-into-view";

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
  toast.error(title, {
    description: firstErrorMessage ?? "An unknown error occurred.",
  });
  const firstErrorPath = first(Object.keys(form.errors));
  if (firstErrorPath) {
    const input = form.getInputNode(firstErrorPath);
    if (input) {
      input.focus();
      scrollIntoView(input, {
        align: { top: 0, topOffset: calculateHeaderHeight() },
      });
    }
  }
};

const calculateHeaderHeight = (): number => {
  const header = first(document.getElementsByTagName("header"));
  return header ? header.clientHeight : 0;
};

export const useFieldsFilled = <Values extends {}>(
  values: Values,
  ...fields: LooseKeys<Values>[]
): boolean => {
  const checkFields = useCallback(
    (values: Values, fields: LooseKeys<Values>[]) => {
      const fieldsToCheck = isEmpty(fields) ? Object.keys(values) : fields;
      return fieldsToCheck.every(field => isFilledValue(get(values, field)));
    },
    [],
  );
  const [filled, setFilled] = useState(() => checkFields(values, fields));
  const firstRenderRef = useRef(true);
  useShallowEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      setFilled(checkFields(values, fields));
    }
  }, [values, fields, checkFields]);
  return filled;
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
