import { type Errors } from "@inertiajs/core";
import {
  type Method,
  type PathHelper,
  type ResponseError,
} from "@js-from-routes/client";
import {
  useForm as useMantineForm,
  type UseFormInput,
  type UseFormReturnType,
} from "@mantine/form";
import { type _TransformValues, type LooseKeys } from "@mantine/form/lib/types";
import { type FormEvent } from "react";
import scrollIntoView from "scroll-into-view";
import { toast } from "sonner";

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

export const setFormErrorsAndShowAlert = <
  Values,
  TransformValues extends _TransformValues<Values>,
>(
  form: Pick<
    UseFormReturnType<Values, TransformValues>,
    "errors" | "setErrors" | "getInputNode"
  >,
  errors: Errors,
  title: string,
): void => {
  form.setErrors(errors);
  showFormErrorsAlert({ ...form, errors }, title);
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

type PartialFormHelper<
  Values,
  TransformValues extends (values: Values) => unknown,
> = Omit<UseFormReturnType<Values, TransformValues>, "onSubmit" | "onReset">;

export interface FormOptions<
  Data extends Record<string, any> & { error?: never },
  Values,
  TransformValues extends (values: Values) => unknown,
> extends UseFormInput<Values, TransformValues> {
  action: PathHelper;
  descriptor: string;
  params?: {
    query?: Record<string, any>;
    [key: string]: any;
  };
  method?: Method;
  failSilently?: boolean;
  onSubmit?: (
    transformedValues: ReturnType<TransformValues>,
    // submission: Promise<Data>,
    form: PartialFormHelper<Values, TransformValues>,
  ) => void;
  onSuccess?: (
    data: Data,
    form: PartialFormHelper<Values, TransformValues>,
  ) => void;
  onFailure?: (
    error: Error,
    form: PartialFormHelper<Values, TransformValues>,
  ) => void;
  onError?: (form: PartialFormHelper<Values, TransformValues>) => void;
}

export interface FormHelper<
  Data,
  Values,
  TransformValues extends (values: Values) => unknown,
> extends Omit<
    UseFormReturnType<Values, TransformValues>,
    "setSubmitting" | "onSubmit"
  > {
  data: Data | undefined;
  error: Error | undefined;
  submit: (event?: FormEvent<HTMLFormElement>) => void;
}

const NO_BODY_METHODS: Method[] = [
  "get",
  "GET",
  "delete",
  "DELETE",
  "head",
  "HEAD",
  "options",
  "OPTIONS",
];

export const useForm = <
  Data extends Record<string, any> & { error?: never; errors?: never } = {},
  Values extends Record<string, any> = {},
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(
  options: FormOptions<Data, Values, TransformValues>,
): FormHelper<Data, Values, TransformValues> => {
  const {
    action,
    method = action.httpMethod,
    descriptor,
    failSilently,
    onSubmit,
    onError,
    onFailure,
    onSuccess,
    params,
    transformValues,
    ...otherOptions
  } = options;
  const form = useMantineForm<Values, TransformValues>({
    ...otherOptions,
    transformValues,
  });
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const submit = form.onSubmit(
    transformedValues => {
      form.setSubmitting(true);
      onSubmit?.(transformedValues, form);
      action<Data & { error?: string; errors?: Record<string, string> }>({
        params,
        method,
        data: NO_BODY_METHODS.includes(method) ? undefined : transformedValues,
      })
        .then(
          data => {
            setData(data);
            onSuccess?.(data, form);
            return data;
          },
          (responseError: ResponseError) => {
            if (responseError.body) {
              const body = responseError.body as {
                error?: string;
                errors?: Record<string, string>;
              };
              if (typeof body.error === "string") {
                const error = new Error(body.error);
                setError(error);
                console.error(`Failed to ${descriptor}`, error);
                if (!failSilently) {
                  toast.error(`Failed to ${descriptor}`, {
                    description: sentencify(
                      error.message || "An unknown error occurred",
                    ),
                  });
                }
                onFailure?.(error, form);
              } else if (typeof body.errors === "object") {
                const { errors } = body;
                form.setErrors(errors);
                console.warn(`Couldn't ${descriptor}`, errors);
                const formWithErrors = { ...form, errors };
                if (!failSilently) {
                  showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
                }
                onError?.(formWithErrors);
              }
            } else {
              console.error("Unknown error response", responseError);
              if (!failSilently) {
                toast.error(`Failed to ${descriptor}`, {
                  description: sentencify(
                    responseError.message || "An unknown error occurred",
                  ),
                });
              }
              onFailure?.(responseError, form);
            }
            throw responseError;
          },
        )
        .finally(() => {
          form.setSubmitting(false);
        });
    },
    errors => {
      const formWithErrors = { ...form, errors };
      onError?.(formWithErrors);
      showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
    },
  );
  return {
    ...form,
    submit,
    data,
    error,
  };
};
