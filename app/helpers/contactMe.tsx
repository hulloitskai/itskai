import type { QueryResult } from "@apollo/client";

import { ContactEmailQueryDocument } from "~/helpers/graphql";

export type ContactMeOptions = {
  readonly subject?: string;
  readonly body?: string;
};

export const useContactMe = (
  options?: ContactMeOptions,
): [
  (options?: ContactMeOptions) => void,
  Pick<QueryResult, "loading" | "error" | "called">,
] => {
  const onError = useApolloAlertCallback("Failed to load contact email");
  const [runQuery, { loading, error, called }] = useLazyQuery(
    ContactEmailQueryDocument,
    { onError },
  );
  const contact = (optionsOverride?: ContactMeOptions) => {
    runQuery({
      variables: {},
    }).then(({ data }) => {
      if (data) {
        const combinedOptions = Object.assign({}, options, optionsOverride);
        location.href = contactUrl(data.email, combinedOptions);
      }
    });
  };
  return [contact, { loading, error, called }];
};

const contactUrl = (email: string, options?: ContactMeOptions): string => {
  let url = `mailto:${email}`;
  const params: string[] = [];
  if (options?.subject) {
    params.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options?.body) {
    params.push(`body=${encodeURIComponent(options.body)}`);
  }
  if (!isEmpty(params)) {
    url += `?${params.join("&")}`;
  }
  return url;
};
