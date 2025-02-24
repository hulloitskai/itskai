import { router } from "@inertiajs/core";
import { closeAllModals } from "@mantine/modals";

export const setupInertia = (): void => {
  router.on("before", ({ detail: { visit } }) => {
    const csrfToken = getMeta("csrf-token");
    if (csrfToken) {
      visit.headers["X-CSRF-Token"] = csrfToken;
    }
  });
  router.on("invalid", event => {
    console.warn("Invalid Inertia response", event.detail.response.data);
  });
  router.on("exception", event => {
    console.error(
      "An unexpected error occurred during an Inertia visit",
      event.detail.exception,
    );
  });
  router.on("navigate", () => {
    closeAllModals();
  });
};
