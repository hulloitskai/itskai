import type { ButtonProps } from "@mantine/core";

import type { TimelinePhotosImportFormProps } from "./TimelinePhotosImportForm";
import TimelinePhotosImportForm from "./TimelinePhotosImportForm";

export interface TimelinePhotosImportButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick">,
    Pick<TimelinePhotosImportFormProps, "onImport"> {}

const TimelinePhotosImportButton: FC<TimelinePhotosImportButtonProps> = ({
  onImport,
  children,
  ...otherProps
}) => {
  return (
    <Button
      variant="default"
      onClick={() => {
        openModal({
          title: "Import timeline photos",
          children: <TimelinePhotosImportForm {...{ onImport }} />,
        });
      }}
      {...otherProps}
    >
      {children ?? "Import timeline photos"}
    </Button>
  );
};

export default TimelinePhotosImportButton;
