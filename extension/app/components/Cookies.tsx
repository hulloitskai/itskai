import { FC } from "react";
import { Table, Text } from "@mantine/core";
import { takeRight } from "lodash-es";

import { ImportCookiesMutationDocument } from "~/helpers/graphql";

const Cookies: FC = () => {
  // == Cookies
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[] | undefined>();
  useEffect(() => {
    chrome.tabs.query({ active: true }, tabs => {
      const tab = first(tabs);
      if (tab) {
        invariant(tab.url, "Tab URL is undefined");
        const url = new URL(tab.url);
        const domain = takeRight(url.hostname.split("."), 2).join(".");
        chrome.cookies.getAll({ domain }, cookies => {
          setCookies(cookies);
        });
      } else {
        setCookies([]);
      }
    });
  }, []);

  // == Mutation
  const onError = useApolloAlertCallback("Failed to sync cookies");
  const [runMutation, { loading }] = useMutation(
    ImportCookiesMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Those cookies do be synced!",
        });
      },
      onError,
    },
  );

  // == Markup
  return (
    <Stack spacing={8}>
      <Text weight={600}>Cookies</Text>
      {cookies ? (
        <Stack spacing={8}>
          {!isEmpty(cookies) ? (
            <>
              <Table withBorder horizontalSpacing={8} verticalSpacing={4}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map(({ name, value }) => (
                    <tr key={`${name}:${value}`}>
                      <td>
                        <Text truncate maw={100}>
                          {name}
                        </Text>
                      </td>
                      <td>
                        <Text truncate maw={200}>
                          {value}
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                onClick={() => {
                  runMutation({
                    variables: {
                      input: {
                        service: "instagram",
                        cookies: cookies.map(cookie =>
                          pick(
                            cookie,
                            "domain",
                            "expirationDate",
                            "hostOnly",
                            "httpOnly",
                            "name",
                            "path",
                            "sameSite",
                            "secure",
                            "session",
                            "value",
                          ),
                        ),
                      },
                    },
                  });
                }}
                {...{ loading }}
              >
                Sync
              </Button>
            </>
          ) : (
            <Text>No cookies for this tab.</Text>
          )}
        </Stack>
      ) : (
        <Skeleton height={100} />
      )}
    </Stack>
  );
};

export default Cookies;
