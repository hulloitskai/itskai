import type { UseFormReturnType } from "@mantine/form";
import type { _TransformValues } from "@mantine/form/lib/types";
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
