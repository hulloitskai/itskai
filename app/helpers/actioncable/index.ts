import { createContext } from "react";
import type { Consumer } from "@rails/actioncable";

export const ActionCableContext = createContext<Consumer | null>(null);

export const useCable = () => {
  const cable = useContext(ActionCableContext);
  if (!cable) {
    throw new Error("useCable must be used within an ActionCableProvider");
  }
  return cable;
};
