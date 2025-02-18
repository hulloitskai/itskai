import {
  type Method,
  type PathHelper,
  type ResponseError,
} from "@js-from-routes/client";
import {
  useForm,
  type UseFormInput,
  type UseFormReturnType,
} from "@mantine/form";
import { type FormEvent } from "react";

import { showFormErrorsAlert } from "~/helpers/form";

import { fetchRoute, getResponseErrors } from ".";

type FetchPartialForm<
  Values,
  TransformValues extends (values: Values) => unknown,
> = Omit<UseFormReturnType<Values, TransformValues>, "onSubmit" | "onReset">;

export interface FetchFormOptions<
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
    form: FetchPartialForm<Values, TransformValues>,
  ) => void;
  onSuccess?: (
    data: Data,
    form: FetchPartialForm<Values, TransformValues>,
  ) => void;
  onFailure?: (
    error: Error,
    form: FetchPartialForm<Values, TransformValues>,
  ) => void;
  onError?: (form: FetchPartialForm<Values, TransformValues>) => void;
}

type FetchFormSubmit = (event?: FormEvent<HTMLFormElement>) => void;

export interface FetchForm<
  Data,
  Values,
  TransformValues extends (values: Values) => unknown,
> extends Omit<
    UseFormReturnType<Values, TransformValues>,
    "setSubmitting" | "onSubmit"
  > {
  data: Data | undefined;
  error: Error | undefined;
  submit: FetchFormSubmit;
}

type _TransformValues<Values> = (values: Values) => unknown;

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

// TODO: Serialize form data.
export const useFetchForm = <
  Data extends Record<string, any> & { error?: never; errors?: never } = {},
  Values extends Record<string, any> = {},
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(
  options: FetchFormOptions<Data, Values, TransformValues>,
): FetchForm<Data, Values, TransformValues> => {
  const {
    action,
    descriptor,
    method,
    params,
    failSilently,
    onSubmit,
    onSuccess,
    onError,
    onFailure,
    ...formOptions
  } = options;
  const form = useForm<Values, TransformValues>(formOptions);
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const submit = form.onSubmit(
    values => {
      form.setSubmitting(true);
      onSubmit?.(values, form);
      return fetchRoute<
        Data & { error?: string; errors?: Record<string, string> }
      >(action, {
        descriptor,
        method,
        params,
        failSilently,
        data: method && NO_BODY_METHODS.includes(method) ? undefined : values,
      })
        .then(
          data => {
            setData(data);
            onSuccess?.(data, form);
            form.reset();
            return data;
          },
          (error: Error | ResponseError) => {
            const errors = getResponseErrors(error);
            if (errors) {
              form.setErrors(errors);
              console.warn(`Couldn't ${descriptor}`, { errors });
              const formWithErrors = { ...form, errors };
              if (!failSilently) {
                showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
              }
              onError?.(formWithErrors);
            } else {
              setError(error);
              onFailure?.(error, form);
            }
            return error;
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
