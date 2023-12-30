import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import type { TimelineActivitiesImportFormProps } from "./TimelineActivitiesImportForm";
import TimelineActivitiesImportForm from "./TimelineActivitiesImportForm";

export type TimelineActivitiesImportButtonProps = Omit<ButtonProps, "onClick"> &
  Pick<TimelineActivitiesImportFormProps, "onImport">;

const TimelineActivitiesImportButton: FC<
  TimelineActivitiesImportButtonProps
> = ({ onImport, children, ...otherProps }) => {
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
