import { type PathHelper } from "@js-from-routes/client";

import { type User } from "~/types";

import routes from "./generated";

export default routes;
export { setupRoutes } from "./setup";

export const homeRoute = (user: User): PathHelper =>
  user.is_owner ? routes.admin.show : routes.home.show;
