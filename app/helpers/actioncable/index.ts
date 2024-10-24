import { type Consumer } from "@rails/actioncable";
import { createContext, useContext } from "react";

export const ActionCableContext = createContext<Consumer | null>(null);

export const useCable = (): Consumer | null => useContext(ActionCableContext);
