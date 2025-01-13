import { type LocationAccess } from "./generated";

type Noticeable =
  | { type: "Alert"; alert_id: string }
  | { type: "ExplorationComment"; comment_id: string }
  | { type: "LocationAccess"; access: LocationAccess }
  | { type: "Status"; status_id: string };

export default Noticeable;
