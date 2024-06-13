import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import FileField from "./FileField";

export interface TimelinePhotosImportFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onImport?: () => void;
}

const TimelinePhotosImportForm: FC<TimelinePhotosImportFormProps> = ({
  onImport, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  // == Form
  // const { values, onSubmit, reset, getInputProps } = useForm<
  //   TimelinePhotosImportFormValues,
  //   (
  //     values: TimelinePhotosImportFormValues,
  //   ) => TimelinePhotosImportFormSubmission
  // >({
  //   initialValues: {
  //     photos: [],
  //   },
  //   transformValues: ({ photos: locationHistory }) => {
  //     invariant(locationHistory, "Missing location history");
  //     return { photos: locationHistory };
  //   },
  // });

  // == Photos Import
  // const onImportPhotosError = useApolloAlertCallback(
  //   "Failed to import timeline photos",
  // );
  // const [importPhotos, { loading: importingPhotos }] = useMutation(
  //   ImportTimelinePhotosMutationDocument,
  //   {
  //     onCompleted: ({ payload: { importCount } }) => {
  //       onImport?.();
  //       reset();
  //       showNotice({
  //         title: "Imported timeline photos successfully",
  //         message: importCount
  //           ? `${importCount} photos added.`
  //           : "No new photos were added.",
  //       });
  //     },
  //     onError: onImportPhotosError,
  //   },
  // );

  return (
    <Box
      component="form"
      // onSubmit={onSubmit(values => {
      //   importPhotos({
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
          label="Photos"
          fileLabel="photos"
          required
          accept={["image/png", "image/jpeg"]}
          multiple
          // {...getInputProps("photos")}
        />
        <Button
          type="submit"
          disabled
          // disabled={isEmpty(values.photos)}
          // loading={importingPhotos}
        >
          Import
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelinePhotosImportForm;
