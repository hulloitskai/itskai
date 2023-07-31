import type { FC } from "react";
import { Notifications } from "@mantine/notifications";

import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";
import Cookies from "./Cookies";

const App: FC = () => {
  // == Markup
  return (
    <ApolloProvider>
      <MantineProvider>
        <Notifications position="bottom-center" />
        <Box w={375} h={340} p="sm" sx={{ overflowY: "scroll" }}>
          <Cookies />
        </Box>
      </MantineProvider>
    </ApolloProvider>
  );
};

export default App;
