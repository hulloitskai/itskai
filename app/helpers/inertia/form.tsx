import {
  type Method,
  type Page,
  type RequestPayload,
  type VisitOptions,
} from "@inertiajs/core";
import { type PathHelper } from "@js-from-routes/client";
import { type UseFormInput, type UseFormReturnType } from "@mantine/form";
import { type FormEvent } from "react";

import { showFormErrorsAlert } from "~/helpers/form";
import { sentencify } from "~/helpers/inflect";

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
  beforeSubmit?: (form: InertiaPartialForm<Values, TransformValues>) => void;
  onSubmit?: (
    transformedValues: ReturnType<TransformValues>,
    form: InertiaPartialForm<Values, TransformValues>,
  ) => void;
  onSuccess?: (
    page: Page<SharedPageProps>,
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
> extends Omit<UseFormReturnType<Values, TransformValues>, "onSubmit"> {
  processing: boolean;
  submit: InertiaFormSubmit;
}

type _TransformValues<Values> = (values: Values) => RequestPayload;

export const useInertiaForm = <
  Values extends Record<string, any> = Record<string, any>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(
  options: InertiaFormOptions<Values, TransformValues>,
): InertiaForm<Values, TransformValues> => {
  const {
    action: actionRoute,
    descriptor,
    failSilently,
    method: methodOption,
    beforeSubmit,
    onSubmit,
    onError,
    onFailure,
    onSuccess,
    params,
    transformValues,
    ...otherOptions
  } = options;
  const action = useMemo(() => actionRoute.path(params), [actionRoute, params]);
  const form = useForm<Values, TransformValues>({
    ...otherOptions,
    transformValues,
  });
  const [processing, setProcessing] = useState(false);
  let method: Method;
  if (methodOption) {
    method = methodOption;
  } else {
    if (actionRoute.httpMethod in router) {
      method = actionRoute.httpMethod as Method;
    } else {
      method = "get";
    }
  }
  const handleSubmit = form.onSubmit(
    transformedValues => {
      onSubmit?.(transformedValues, form);
      let removeInvalidListener: VoidFunction | undefined;
      const options: Partial<VisitOptions> = {
        preserveScroll: true,
        onBefore: () => {
          removeInvalidListener = router.on("invalid", (event): void => {
            const { response } = event.detail;
            if (response.status >= 400 && response.data instanceof Object) {
              const { error } = response.data as Record<string, any>;
              if (typeof error === "string") {
                event.preventDefault();
                const e = new Error(error);
                console.error(`Failed to ${descriptor}`, e);
                if (!failSilently) {
                  showAlert({
                    title: `Failed to ${descriptor}`,
                    message: sentencify(error),
                  });
                }
                onFailure?.(e, form);
              }
            }
          });
          setProcessing(true);
        },
        onFinish: () => {
          removeInvalidListener?.();
          setProcessing(false);
        },
        onSuccess: page => {
          onSuccess?.(page as unknown as Page<SharedPageProps>, form);
          form.reset();
        },
        onError: errors => {
          form.setErrors(errors);
          console.warn(`Couldn't ${descriptor}`, errors);
          showFormErrorsAlert(form, `Couldn't ${descriptor}`);
          onError?.(form);
        },
      };
      if (method === "delete") {
        router.delete(action, { ...options });
      } else {
        router[method](action, transformedValues, {
          ...options,
        });
      }
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
  };
};
