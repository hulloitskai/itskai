import type { FC } from "react";
import type { BoxProps } from "@mantine/core";
import type { DeepNonNullable } from "~/helpers/deepNonNullable";

import type { UploadInput } from "~/helpers/graphql";
import { ImportTimelineActivitiesMutationDocument } from "~/helpers/graphql";

import FileField from "./FileField";

export type TimelineActivitiesImportFormProps = BoxProps & {
  readonly onImport?: () => void;
};

type TimelineActivitiesImportFormValues = {
  readonly locationHistory: UploadInput | null;
};

type TimelineActivitiesImportFormSubmission =
  DeepNonNullable<TimelineActivitiesImportFormValues>;

const TimelineActivitiesImportForm: FC<TimelineActivitiesImportFormProps> = ({
  onImport,
  ...otherProps
}) => {
  // == Form
  const form = useForm<
    TimelineActivitiesImportFormValues,
    (
      values: TimelineActivitiesImportFormValues,
    ) => TimelineActivitiesImportFormSubmission
  >({
    initialValues: {
      locationHistory: null,
    },
    transformValues: ({ locationHistory }) => {
      invariant(locationHistory, "Missing location history");
      return { locationHistory };
    },
  });
  const { values, onSubmit, reset } = form;
  const { locationHistory } = values;

  // == Importing Activities
  const onImportActivitiesError = useApolloAlertCallback(
    "Failed to import timeline activities",
  );
  const [importActivities, { loading: importingActivities }] = useMutation(
    ImportTimelineActivitiesMutationDocument,
    {
      onCompleted: ({ payload: { importCount } }) => {
        onImport?.();
        reset();
        showNotice({
          title: "Imported timeline activities successfully",
          message: importCount
            ? `${importCount} activities added.`
            : "No new activities were added.",
        });
      },
      onError: onImportActivitiesError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        importActivities({
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
          name="locationHistory"
          label="Google location history file"
          fileLabel="location history file"
          required
          accept={["application/json"]}
          {...{ form }}
        />
        <Button
          type="submit"
          disabled={!locationHistory}
          loading={importingActivities}
        >
          Import
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelineActivitiesImportForm;
