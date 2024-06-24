import { fetch } from "./fetch";

export interface ContactMeOptions {
  subject?: string;
  body?: string;
}

export type ContactMeResult = {
  loading: boolean;
  error?: Error;
};

export const useContactMe = (
  options?: ContactMeOptions,
): [(options?: ContactMeOptions) => void, ContactMeResult] => {
  const [result, setResult] = useState<ContactMeResult>({
    loading: false,
  });
  const contactMe = useCallback(() => {
    setResult(result => ({ ...result, loading: true }));
    fetch<{ mailto: string }>(routes.contactUrls.show, {
      descriptor: "load contact email",
      params: options,
    })
      .then(
        ({ mailto }): void => {
          window.location.href = mailto;
        },
        error => {
          setResult(result => ({ ...result, error }));
        },
      )
      .finally(() => {
        setResult(result => ({ ...result, loading: false }));
      });
  }, [options]);
  return [contactMe, result];
};
