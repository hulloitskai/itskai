import type { ErrorBag, Errors } from "@inertiajs/inertia";

export const useBaggedErrors = (
  errors: (Errors & ErrorBag) | undefined,
  errorBag: string,
): Errors | undefined => {
  return useMemo(() => {
    if (errors) {
      const baggedErrors = errors[errorBag];
      if (typeof baggedErrors === "object") {
        return baggedErrors as Errors;
      }
    }
  }, [errors, errorBag]);
};
