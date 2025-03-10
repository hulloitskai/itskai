import { useCallback, useState } from "react";

import { fetchRoute } from "./routes/fetch";

export interface UseContactOptions {
  subject?: string;
  body?: string;
  onTriggered?: () => void;
}

export interface UseContactResult {
  loading: boolean;
  error?: Error;
}

export const useContact = (
  options?: UseContactOptions,
): [(options?: UseContactOptions) => void, UseContactResult] => {
  const [result, setResult] = useState<UseContactResult>({
    loading: false,
  });
  const contact = useCallback(() => {
    setResult(result => ({ ...result, loading: true }));
    const { onTriggered, ...params } = options ?? {};
    fetchRoute<{ mailto: string }>(routes.contactUrls.show, {
      descriptor: "load contact email",
      params,
    })
      .then(
        ({ mailto }): void => {
          location.href = mailto;
          onTriggered?.();
        },
        (error: Error) => {
          setResult(result => ({ ...result, error }));
        },
      )
      .finally(() => {
        setResult(result => ({ ...result, loading: false }));
      });
  }, [options]);
  return [contact, result];
};
