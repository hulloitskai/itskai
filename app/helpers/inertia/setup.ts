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
    const { response } = event.detail;
    const contentType = response.headers["Content-Type"];
    if (
      response.data &&
      typeof contentType === "string" &&
      contentType.startsWith("text/html")
    ) {
      event.preventDefault();
      console.error("Invalid Inertia response", event.detail.response.data);
    }
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
