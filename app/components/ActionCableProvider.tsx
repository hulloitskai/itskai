import { type Consumer } from "@rails/actioncable";
import { createConsumer } from "@rails/actioncable";

import { ActionCableContext } from "~/helpers/actioncable";

const ActionCableProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cable, setCable] = useState<Consumer>();
  useEffect(() => {
    setCable(createConsumer());
  }, []);
  return (
    <ActionCableContext.Provider value={cable}>
      {children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
