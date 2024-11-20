type Noticeable =
  | { type: "Alert"; alert_id: string }
  | { type: "ExplorationComment"; comment_id: string }
  | { type: "LocationAccess"; location_access_id: string };

export default Noticeable;
