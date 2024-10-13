import { type Method } from "@inertiajs/core";
import { type PathHelper, type ResponseError } from "@js-from-routes/client";
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
    failSilently,
    method = action.httpMethod,
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
  const submit = form.onSubmit(
    transformedValues => {
      setProcessing(true);
      const submission = action<
        Data & { error?: string; errors?: Record<string, string> }
      >({
        params,
        method,
        data: method === "delete" ? undefined : transformedValues,
      })
        .then(
          data => {
            setData(data);
            onSuccess?.(data, form);
            form.reset();
            return data;
          },
          (responseError: ResponseError) => {
            if (responseError.body) {
              const { error, errors } = responseError.body as {
                error?: string;
                errors?: Record<string, string>;
              };
              if (error) {
                const e = new Error(error);
                setError(e);
                console.error(`Failed to ${descriptor}`, error);
                if (!failSilently) {
                  showAlert({
                    title: `Failed to ${descriptor}`,
                    message: sentencify(error),
                  });
                }
                onFailure?.(e, form);
              } else if (errors) {
                form.setErrors(errors);
                console.warn(`Couldn't ${descriptor}`, {
                  errors,
                });
                const formWithErrors = { ...form, errors };
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
  return {
    ...form,
    processing,
    submit,
    data,
    error,
  };
};
