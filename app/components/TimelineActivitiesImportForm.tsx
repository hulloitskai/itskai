import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import FileField from "./FileField";

export interface TimelineActivitiesImportFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onImport?: () => void;
}

const TimelineActivitiesImportForm: FC<TimelineActivitiesImportFormProps> = ({
  onImport, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  // == Form
  // const { values, onSubmit, reset, getInputProps } = useForm<
  //   TimelineActivitiesImportFormValues,
  //   (
  //     values: TimelineActivitiesImportFormValues,
  //   ) => TimelineActivitiesImportFormSubmission
  // >({
  //   initialValues: {
  //     locationHistory: null as FileValue | null,
  //   },
  //   transformValues: ({ locationHistory }) => {
  //     invariant(locationHistory, "Missing location history");
  //     return { locationHistory };
  //   },
  // });

  // == Activities Import
  // const onImportActivitiesError = useApolloAlertCallback(
  //   "Failed to import timeline activities",
  // );
  // const [importActivities, { loading: importingActivities }] = useMutation(
  //   ImportTimelineActivitiesMutationDocument,
  //   {
  //     onCompleted: ({ payload: { importCount } }) => {
  //       onImport?.();
  //       reset();
  //       showNotice({
  //         title: "Imported timeline activities successfully",
  //         message: importCount
  //           ? `${importCount} activities added.`
  //           : "No new activities were added.",
  //       });
  //     },
  //     onError: onImportActivitiesError,
  //   },
  // );

  return (
    <Box
      component="form"
      // onSubmit={onSubmit(values => {
      //   importActivities({
      //     variables: {
      //       input: {
      //         ...values,
      //       },
      //     },
      //   });
      // })}
      {...otherProps}
    >
      <Stack gap="sm">
        <FileField
          label="Google location history file"
          fileLabel="location history file"
          required
          accept={["application/json"]}
          // {...getInputProps("locationHistory")}
        />
        <Button
          type="submit"
          disabled
          // disabled={!values.locationHistory}
          // loading={importingActivities}
        >
          Import
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelineActivitiesImportForm;
