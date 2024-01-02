import type { FC } from "react";
import type { ButtonProps } from "@mantine/core";

import type { TimelinePhotoCreateWithTimestampFormProps } from "./TimelinePhotoCreateWithTimestampForm";
import TimelinePhotoCreateWithTimestampForm from "./TimelinePhotoCreateWithTimestampForm";

export type TimelinePhotoCreateWithTimestampButtonProps = Omit<
  ButtonProps,
  "onClick"
> &
  Pick<TimelinePhotoCreateWithTimestampFormProps, "onCreate">;

const TimelinePhotoCreateWithTimestampButton: FC<
  TimelinePhotoCreateWithTimestampButtonProps
> = ({ onCreate, children, ...otherProps }) => {
  return (
    <Button
      variant="default"
      onClick={() => {
        openModal({
          title: "Create timeline photos",
          children: <TimelinePhotoCreateWithTimestampForm {...{ onCreate }} />,
        });
      }}
      {...otherProps}
    >
      {children ?? "Create timeline photo with timestamp"}
    </Button>
  );
};

export default TimelinePhotoCreateWithTimestampButton;
