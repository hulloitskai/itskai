import type { FC } from "react";
import { takeRight } from "lodash-es";

import { MantineProvider, Table, Text } from "@mantine/core";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

const App: FC = () => {
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

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Box w={375} h={340} p="sm" sx={{ overflowY: "scroll" }}>
        <Stack spacing={8}>
          <Text weight={600}>Cookies</Text>
          {cookies ? (
            <Box>
              {!isEmpty(cookies) ? (
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
              ) : (
                <Text>No cookies for this tab.</Text>
              )}
            </Box>
          ) : (
            <Skeleton height={100} />
          )}
        </Stack>
      </Box>
    </MantineProvider>
  );
};

export default App;
