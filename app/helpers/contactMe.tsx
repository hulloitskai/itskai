import type { QueryResult } from "@apollo/client";

import { ContactEmailQueryDocument } from "~/helpers/graphql";

export type ContactMeOptions = {
  readonly subject?: string;
};

export const useContactMe = (
  options?: ContactMeOptions,
): [() => void, Pick<QueryResult, "loading" | "error" | "called">] => {
  const onError = useApolloAlertCallback("Failed to load contact email");
  const [runQuery, { loading, error, called }] = useLazyQuery(
    ContactEmailQueryDocument,
    {
      onCompleted: ({ email }) => {
        location.href = contactUrl(email, options);
      },
      onError,
    },
  );
  const contact = () => {
    runQuery({
      variables: {},
    });
  };
  return [contact, { loading, error, called }];
};

const contactUrl = (email: string, options?: ContactMeOptions): string => {
  let url = `mailto:${email}`;
  if (options?.subject) {
    url += `?subject=${encodeURIComponent(options.subject)}`;
  }
  return url;
};
