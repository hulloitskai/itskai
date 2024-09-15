import { type ButtonProps } from "@mantine/core";

import { type TimelineActivitiesImportFormProps } from "./TimelineActivitiesImportForm";
import TimelineActivitiesImportForm from "./TimelineActivitiesImportForm";

export interface TimelineActivitiesImportButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick">,
    Pick<TimelineActivitiesImportFormProps, "onImport"> {}

const TimelineActivitiesImportButton: FC<
  TimelineActivitiesImportButtonProps
> = ({ children, onImport, ...otherProps }) => {
  return (
    <Button
      variant="default"
      onClick={() => {
        openModal({
          title: "Import timeline activities",
          children: <TimelineActivitiesImportForm {...{ onImport }} />,
        });
      }}
      {...otherProps}
    >
      {children ?? "Import timeline activities"}
    </Button>
  );
};

export default TimelineActivitiesImportButton;
