import type { FC, PropsWithChildren } from "react";
import { createConsumer } from "@rails/actioncable";
import { ActionCableContext } from "~/helpers/actioncable";

export interface ActionCableProviderProps extends PropsWithChildren {}

const ActionCableProvider: FC<ActionCableProviderProps> = ({ children }) => {
  const [cable] = useState(createConsumer);
  return (
    <ActionCableContext.Provider value={cable}>
      {children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
