import type { FormEvent } from "react";
import type { Method, VisitOptions } from "@inertiajs/core";
import type { PathHelper } from "@js-from-routes/client";
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

export interface InertiaFormOptions<Values extends Record<string, any>>
  extends UseFormInput<Values, TransformValues<Values>> {
  action: PathHelper;
  descriptor: string;
  params?: {
    query?: Record<string, any>;
    [key: string]: any;
  };
  method?: Method;
  transformErrors?: (errors: Record<string, string>) => FormErrors;
  onSuccess?: (form: InertiaPartialForm<Values>) => void;
  onError?: (form: InertiaPartialForm<Values>) => void;
}

type InertiaFormSubmit = (event?: FormEvent<HTMLFormElement>) => void;

export interface InertiaForm<Values extends Record<string, any>>
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
    onSuccess,
    onError,
    ...otherOptions
  } = options;
  const action = useMemo(() => actionRoute.path(params), [actionRoute, params]);
  const form = useForm<Values, TransformValues<Values>>({
    ...otherOptions,
    transformValues,
  });
  const [processing, setProcesing] = useState(false);
  const submit = form.onSubmit(
    (data: any) => {
      const options: Partial<VisitOptions> = {
        preserveScroll: true,
        onBefore: () => {
          setProcesing(true);
        },
        onFinish: () => {
          setProcesing(false);
        },
        onSuccess: () => {
          form.reset();
          onSuccess?.(form);
        },
        onError: errors => {
          const formErrors: FormErrors = transformErrors(errors);
          form.setErrors(formErrors);
          onError?.({ ...form, errors: formErrors });
          showFormErrorsAlert(formErrors, `Couldn't ${descriptor}`);
          console.warn(`Couldn't ${descriptor}`, { errors: formErrors });
        },
      };
      if (method === "delete") {
        router.delete(action, { ...options });
      } else {
        router[method](action, data, { ...options });
      }
    },
    errors => {
      onError?.({ ...form, errors });
      showFormErrorsAlert(errors, `Couldn't ${descriptor}`);
    },
  );
  return {
    ...form,
    processing,
    submit,
  };
};
