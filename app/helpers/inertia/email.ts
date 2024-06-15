import type { ComponentType, ReactNode } from "react";

export type EmailComponent<Props = {}> = ComponentType<Props> & {
  layout?: ((page: ReactNode) => ReactNode) | null;
};
