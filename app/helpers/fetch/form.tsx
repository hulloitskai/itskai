import {
  type Method,
  type PathHelper,
  type ResponseError,
} from "@js-from-routes/client";
import { type UseFormInput, type UseFormReturnType } from "@mantine/form";
import { type FormEvent } from "react";

import { showFormErrorsAlert } from "~/helpers/form";
import { sentencify } from "~/helpers/inflect";

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
  beforeSubmit?: (form: FetchPartialForm<Values, TransformValues>) => void;
  onSubmit?: (
    transformedValues: ReturnType<TransformValues>,
    submission: Promise<Data>,
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
> extends Omit<UseFormReturnType<Values, TransformValues>, "onSubmit"> {
  data: Data | undefined;
  error: Error | undefined;
  processing: boolean;
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
    method = action.httpMethod,
    descriptor,
    failSilently,
    beforeSubmit,
    onSubmit,
    onError,
    onFailure,
    onSuccess,
    params,
    transformValues,
    ...otherOptions
  } = options;
  const form = useForm<Values, TransformValues>({
    ...otherOptions,
    transformValues,
  });
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [processing, setProcessing] = useState(false);
  const handleSubmit = form.onSubmit(
    transformedValues => {
      setProcessing(true);
      const submission = action<
        Data & { error?: string; errors?: Record<string, string> }
      >({
        params,
        method,
        data: NO_BODY_METHODS.includes(method) ? undefined : transformedValues,
      })
        .then(
          data => {
            startTransition(() => {
              setData(data);
            });
            onSuccess?.(data, form);
            form.reset();
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
                startTransition(() => {
                  setError(error);
                });
                console.error(`Failed to ${descriptor}`, error);
                if (!failSilently) {
                  showAlert({
                    title: `Failed to ${descriptor}`,
                    message: sentencify(body.error),
                  });
                }
                onFailure?.(error, form);
              } else if (typeof body.errors === "object") {
                form.setErrors(body.errors);
                console.warn(`Couldn't ${descriptor}`, {
                  errors: body.errors,
                });
                const formWithErrors = { ...form, errors: body.errors };
                if (!failSilently) {
                  showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
                }
                onError?.(formWithErrors);
              }
            } else {
              console.error(
                "An unknown error response occurred",
                responseError,
              );
              if (!failSilently) {
                showAlert({
                  title: `Failed to ${descriptor}`,
                  message: sentencify(responseError.message),
                });
              }
              onFailure?.(responseError, form);
            }
            throw responseError;
          },
        )
        .finally(() => {
          setProcessing(false);
        });
      onSubmit?.(transformedValues, submission, form);
    },
    errors => {
      const formWithErrors = { ...form, errors };
      onError?.(formWithErrors);
      showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
    },
  );
  const submit = (event?: FormEvent<HTMLFormElement>) => {
    beforeSubmit?.(form);
    handleSubmit(event);
  };
  return {
    ...form,
    processing,
    submit,
    data,
    error,
  };
};
