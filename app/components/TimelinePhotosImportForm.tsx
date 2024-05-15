import type { FC } from "react";
import type { BoxProps } from "@mantine/core";
import type { DeepNonNullable } from "~/helpers/deepNonNullable";

import type { UploadInput } from "~/helpers/graphql";
import { ImportTimelinePhotosMutationDocument } from "~/helpers/graphql";

import FileField from "./FileField";

export type TimelinePhotosImportFormProps = BoxProps & {
  readonly onImport?: () => void;
};

type TimelinePhotosImportFormValues = {
  readonly photos: UploadInput[];
};

type TimelinePhotosImportFormSubmission =
  DeepNonNullable<TimelinePhotosImportFormValues>;

const TimelinePhotosImportForm: FC<TimelinePhotosImportFormProps> = ({
  onImport,
  ...otherProps
}) => {
  // == Form
  const form = useForm<
    TimelinePhotosImportFormValues,
    (
      values: TimelinePhotosImportFormValues,
    ) => TimelinePhotosImportFormSubmission
  >({
    initialValues: {
      photos: [],
    },
    transformValues: ({ photos: locationHistory }) => {
      invariant(locationHistory, "Missing location history");
      return { photos: locationHistory };
    },
  });
  const { values, onSubmit, reset } = form;
  const { photos } = values;

  // == Photos Import
  const onImportPhotosError = useApolloAlertCallback(
    "Failed to import timeline photos",
  );
  const [importPhotos, { loading: importingPhotos }] = useMutation(
    ImportTimelinePhotosMutationDocument,
    {
      onCompleted: ({ payload: { importCount } }) => {
        onImport?.();
        reset();
        showNotice({
          title: "Imported timeline photos successfully",
          message: importCount
            ? `${importCount} photos added.`
            : "No new photos were added.",
        });
      },
      onError: onImportPhotosError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        importPhotos({
          variables: {
            input: {
              ...values,
            },
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="sm">
        <FileField
          name="photos"
          label="Photos"
          fileLabel="photos"
          required
          accept={["image/png", "image/jpeg"]}
          multiple
          {...{ form }}
        />
        <Button
          type="submit"
          disabled={isEmpty(photos)}
          loading={importingPhotos}
        >
          Import
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelinePhotosImportForm;
