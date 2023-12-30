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
  const { onSubmit, reset, isDirty } = form;

  // == Mutation
  const onError = useApolloAlertCallback("Failed to import timeline photos");
  const [runMutation, { loading: mutating }] = useMutation(
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
      onError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        runMutation({
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
          accept={["image/png", "image/jpeg"]}
          multiple
          {...{ form }}
        />
        <Button type="submit" disabled={!isDirty()} loading={mutating}>
          Import
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelinePhotosImportForm;
