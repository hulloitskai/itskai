import { fetchRoute } from "./fetch";

export interface ContactOptions {
  subject?: string;
  body?: string;
}

export interface ContactResult {
  loading: boolean;
  error?: Error;
}

export const useContact = (
  options?: ContactOptions,
): [(options?: ContactOptions) => void, ContactResult] => {
  const [result, setResult] = useState<ContactResult>({
    loading: false,
  });
  const contact = useCallback(() => {
    setResult(result => ({ ...result, loading: true }));
    fetchRoute<{ mailto: string }>(routes.contactUrls.show, {
      descriptor: "load contact email",
      params: options,
    })
      .then(
        ({ mailto }): void => {
          window.location.href = mailto;
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
