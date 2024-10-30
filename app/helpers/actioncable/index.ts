import { type Consumer } from "@rails/actioncable";
import { createContext, useContext } from "react";

export const ActionCableContext = createContext<Consumer | undefined>(
  undefined,
);

export const useCable = (): Consumer | undefined =>
  useContext(ActionCableContext);
