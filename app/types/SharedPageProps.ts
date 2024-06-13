import type { PageProps } from "@inertiajs/core";
import type { User } from ".";

export default interface SharedPageProps extends PageProps {
  csrf: {
    param: string;
    token: string;
  };
  flash: Record<string, string>;
  currentUser: User | null;
}
