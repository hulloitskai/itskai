import { router } from "@inertiajs/core";
import { closeAllModals } from "@mantine/modals";

export const setupInertia = (): void => {
  router.on("before", ({ detail: { visit } }) => {
    const csrfToken = getMeta("csrf-token");
    if (csrfToken) {
      visit.headers["X-CSRF-Token"] = csrfToken;
    }
  });
  router.on("navigate", () => {
    closeAllModals();
  });
};
