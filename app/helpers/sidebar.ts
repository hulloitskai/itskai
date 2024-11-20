import { createContext, useContext } from "react";

export interface SidebarControls {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const SidebarControlsContext = createContext<SidebarControls | null>(
  null,
);

export const useSidebarControls = (): SidebarControls | null => {
  return useContext(SidebarControlsContext);
};
