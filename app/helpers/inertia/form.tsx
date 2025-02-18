import { type Method, type Page, type RequestPayload } from "@inertiajs/core";
import { type PathHelper } from "@js-from-routes/client";
import {
  useForm,
  type UseFormInput,
  type UseFormReturnType,
} from "@mantine/form";
import { type FormEvent } from "react";

import { showFormErrorsAlert } from "~/helpers/form";

import { visitRoute } from ".";

type InertiaPartialForm<
  Values,
  TransformValues extends (values: Values) => unknown,
> = Omit<UseFormReturnType<Values, TransformValues>, "onSubmit" | "onReset">;

export interface InertiaFormOptions<
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
    form: InertiaPartialForm<Values, TransformValues>,
  ) => void;
  onSuccess?: (
    page: Page,
    form: InertiaPartialForm<Values, TransformValues>,
  ) => void;
  onError?: (form: InertiaPartialForm<Values, TransformValues>) => void;
  onFailure?: (
    error: Error,
    form: InertiaPartialForm<Values, TransformValues>,
  ) => void;
}

type InertiaFormSubmit = (event?: FormEvent<HTMLFormElement>) => void;

export interface InertiaForm<
  Values,
  TransformValues extends (values: Values) => unknown,
> extends Omit<
    UseFormReturnType<Values, TransformValues>,
    "setSubmitting" | "onSubmit"
  > {
  submit: InertiaFormSubmit;
  error: Error | undefined;
}

type _TransformValues<Values> = (values: Values) => RequestPayload;

const NO_BODY_METHODS: Method[] = ["get", "delete"];

export const useInertiaForm = <
  Values extends Record<string, any> = Record<string, any>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(
  options: InertiaFormOptions<Values, TransformValues>,
): InertiaForm<Values, TransformValues> => {
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
  const [error, setError] = useState<Error | undefined>();
  const submit = form.onSubmit(
    values => {
      form.setSubmitting(true);
      onSubmit?.(values, form);
      return visitRoute(action, {
        descriptor,
        method,
        params,
        failSilently,
        data: method && NO_BODY_METHODS.includes(method) ? undefined : values,
        onFinish: () => {
          form.setSubmitting(false);
        },
        onSuccess: page => {
          onSuccess?.(page, form);
          form.reset();
        },
        onFailure: error => {
          setError(error);
          onFailure?.(error, form);
        },
        onError: errors => {
          form.setErrors(errors);
          console.warn(`Couldn't ${descriptor}`, errors);
          const formWithErrors = { ...form, errors };
          showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
          onError?.(formWithErrors);
        },
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
    error,
  };
};
