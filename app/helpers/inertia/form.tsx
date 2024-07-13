import type { FormEvent } from "react";
import type { Method, VisitOptions } from "@inertiajs/core";
import type { PathHelper } from "@js-from-routes/client";
import { sentencify } from "~/helpers/inflect";
import { showFormErrorsAlert } from "~/helpers/form";

import type {
  FormErrors,
  UseFormInput,
  UseFormReturnType,
} from "@mantine/form";

type InertiaPartialForm<Values> = Omit<
  UseFormReturnType<Values>,
  "onSubmit" | "onReset"
>;

type TransformValues<Values> = (values: Values) => any;

export interface InertiaFormOptions<Values>
  extends UseFormInput<Values, TransformValues<Values>> {
  action: PathHelper;
  descriptor: string;
  params?: {
    query?: Record<string, any>;
    [key: string]: any;
  };
  method?: Method;
  failSilently?: boolean;
  transformErrors?: (errors: Record<string, string>) => FormErrors;
  onSuccess?: (form: InertiaPartialForm<Values>) => void;
  onError?: (form: InertiaPartialForm<Values>) => void;
  onFailure?: (error: Error, form: InertiaPartialForm<Values>) => void;
}

type InertiaFormSubmit = (event?: FormEvent<HTMLFormElement>) => void;

export interface InertiaForm<Values>
  extends Omit<UseFormReturnType<Values, TransformValues<Values>>, "onSubmit"> {
  processing: boolean;
  submit: InertiaFormSubmit;
}

export const useInertiaForm = <
  Values extends Record<string, any> = Record<string, any>,
>(
  options: InertiaFormOptions<Values>,
): InertiaForm<Values> => {
  const {
    action: actionRoute,
    params,
    descriptor,
    method = "get",
    transformValues = deepUnderscoreKeys,
    transformErrors = deepCamelizeKeys,
    failSilently,
    onSuccess,
    onError,
    onFailure,
    ...otherOptions
  } = options;
  const action = useMemo(() => actionRoute.path(params), [actionRoute, params]);
  const form = useForm<Values, TransformValues<Values>>({
    ...otherOptions,
    transformValues,
  });
  const [processing, setProcessing] = useState(false);
  const submit = form.onSubmit(
    (data: any) => {
      let removeInvalidListener: VoidFunction | undefined;
      const options: Partial<VisitOptions> = {
        preserveScroll: true,
        onBefore: () => {
          removeInvalidListener = router.on("invalid", (event): void => {
            const { response } = event.detail;
            if (response.status >= 400 && response.data instanceof Object) {
              const { error } = response.data;
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
        onSuccess: () => {
          form.reset();
          onSuccess?.(form);
        },
        onError: errors => {
          const formErrors: FormErrors = transformErrors(errors);
          form.setErrors(formErrors);
          console.warn(`Couldn't ${descriptor}`, formErrors);
          const formWithErrors = { ...form, errors: formErrors };
          showFormErrorsAlert(formWithErrors, `Couldn't ${descriptor}`);
          onError?.(form);
        },
      };
      if (method === "delete") {
        router.delete(action, { ...options });
      } else {
        router[method](action, data, { ...options });
      }
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
  };
};
