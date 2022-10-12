import { QueryResult } from "@apollo/client";

import { ContactEmailQueryDocument } from "~views/shared/helpers/apollo-generated";

export type ContactMeOptions = {
  subject: string;
};

export const useContactMe = (
  options?: ContactMeOptions,
): [() => void, Pick<QueryResult, "loading" | "error" | "called">] => {
  const onError = useErrorCallback("Failed to load contact email");
  const [runQuery, { loading, error, called }] = useLazyQuery(
    ContactEmailQueryDocument,
    {
      onCompleted: ({ email }) => {
        open(contactUrl(email, options));
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
  let url = `mailto:Kai<${email}>`;
  if (options?.subject) {
    url += `?subject=${encodeURIComponent(options.subject)}`;
  }
  return url;
};
