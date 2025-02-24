import { AxiosHeaders } from "axios";

export type { EmailComponent } from "./email";
export type { PageComponent } from "./page";
export { PageType, parsePageImports, resolvePageType } from "./page";
export { setupInertia } from "./setup";

export const handleNonInertiaDocumentResponse = (): VoidFunction => {
  return router.on("invalid", event => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { status, headers, data, request } = event.detail.response;
    if (
      status >= 200 &&
      status < 300 &&
      headers instanceof AxiosHeaders &&
      request instanceof XMLHttpRequest
    ) {
      const contentType = headers.get("Content-Type");
      const url = new URL(request.responseURL);
      if (
        url.host === location.host &&
        typeof contentType === "string" &&
        contentType.startsWith("text/html") &&
        typeof data === "string"
      ) {
        event.preventDefault();
        document.open();
        document.write(data);
        document.close();
        history.pushState(null, "", url.toString());
      }
    }
  });
};
