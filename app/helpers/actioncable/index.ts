import { createContext } from "react";
import type { Consumer } from "@rails/actioncable";

export const ActionCableContext = createContext<Consumer | null>(null);

export const useCable = (): Consumer | null => useContext(ActionCableContext);
