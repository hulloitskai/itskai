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
    const contentType = event.detail.response.headers["Content-Type"];
    if (
      typeof contentType === "string" &&
      contentType.startsWith("text/html")
    ) {
      event.preventDefault();
      console.error("Invalid Inertia response", event.detail.response.data);
    }
  });
  router.on("navigate", () => {
    closeAllModals();
  });
};
