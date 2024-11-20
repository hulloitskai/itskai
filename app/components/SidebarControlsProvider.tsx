import {
  type SidebarControls,
  SidebarControlsContext,
} from "~/helpers/sidebar";

export interface SidebarControlsProviderProps {
  controls: SidebarControls | null;
}

export const SidebarControlsProvider: FC<
  PropsWithChildren<SidebarControlsProviderProps>
> = ({ controls, children }) => (
  <SidebarControlsContext.Provider value={controls}>
    {children}
  </SidebarControlsContext.Provider>
);
