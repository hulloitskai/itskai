import type { FormEvent } from "react";
import type { Method } from "@inertiajs/core";
import type { PathHelper, ResponseError } from "@js-from-routes/client";
import { sentencify } from "~/helpers/inflect";
import { showFormErrorsAlert } from "~/helpers/form";

import type {
  FormErrors,
  UseFormInput,
  UseFormReturnType,
} from "@mantine/form";

type FetchPartialForm<Values> = Omit<
  UseFormReturnType<Values>,
  "onSubmit" | "onReset"
>;

type TransformValues<Values> = (values: Values) => any;

export interface FetchFormOptions<
  Data extends Record<string, any> & { error?: never },
  Values extends Record<string, any>,
> extends UseFormInput<Values, TransformValues<Values>> {
  action: PathHelper;
  descriptor: string;
  params?: {
    query?: Record<string, any>;
    [key: string]: any;
  };
  method?: Method;
  failSilently?: boolean;
  transformErrors?: (errors: Record<string, string>) => FormErrors;
  onSuccess?: (data: Data, form: FetchPartialForm<Values>) => void;
  onFailure?: (error: Error, form: FetchPartialForm<Values>) => void;
  onError?: (form: FetchPartialForm<Values>) => void;
}

type FetchFormSubmit = (event?: FormEvent<HTMLFormElement>) => void;

export interface FetchForm<
  Data extends Record<string, any> & { error?: never; errors?: never },
  Values extends Record<string, any>,
> extends Omit<UseFormReturnType<Values, TransformValues<Values>>, "onSubmit"> {
  data: Data | undefined;
  error: Error | undefined;
  processing: boolean;
  submit: FetchFormSubmit;
}

// TODO: Serialize form data.
export const useFetchForm = <
  Data extends Record<string, any> & { error?: never; errors?: never } = {},
  Values extends Record<string, any> = Record<string, any>,
>(
  options: FetchFormOptions<Data, Values>,
): FetchForm<Data, Values> => {
  const {
    action,
    params,
    descriptor,
    method = "get",
    failSilently,
    transformValues = deepUnderscoreKeys,
    transformErrors = deepCamelizeKeys,
    onSuccess,
    onFailure,
    onError,
    ...otherOptions
  } = options;
  const form = useForm<Values, TransformValues<Values>>({
    ...otherOptions,
    transformValues,
  });
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [processing, setProcessing] = useState(false);
  const submit = form.onSubmit(
    data => {
      setProcessing(true);
      action<Data & { error?: string; errors?: Record<string, string> }>({
        params,
        method,
        data: method === "delete" ? undefined : data,
      })
        .then(
          data => {
            setData(data as Data);
            form.reset();
            onSuccess?.(data as Data, form);
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
                showAlert({
                  title: `Failed to ${descriptor}`,
                  message: sentencify(error),
                });
                onFailure?.(e, form);
              } else if (errors) {
                const formErrors: FormErrors = transformErrors(errors);
                form.setErrors(formErrors);
                console.warn(`Couldn't ${descriptor}`, {
                  errors: formErrors,
                });
                const formWithErrors = { ...form, errors: formErrors };
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
          },
        )
        .finally(() => {
          setProcessing(false);
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
    processing,
    submit,
    data,
    error,
  };
};
