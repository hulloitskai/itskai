import type { FC } from "react";
import type { DeepNonNullable } from "~/helpers/deepNonNullable";
import { DateTimePicker } from "@mantine/dates";

import type { BoxProps } from "@mantine/core";
import { Radio } from "@mantine/core";

import type { UploadInput } from "~/helpers/graphql";
import { CreateTimelinePhotoWithTimestampMutationDocument } from "~/helpers/graphql";

import FileField from "./FileField";

import "@mantine/dates/styles.layer.css";

export type TimelinePhotoCreateWithTimestampFormProps = BoxProps & {
  onCreate?: () => void;
};

type TimelinePhotoCreateWithTimestampFormValues = {
  photo: UploadInput | null;
  timestamp: string;
  timezone: "America/Vancouver" | "America/Toronto";
};

type TimelinePhotoCreateWithTimestampFormSubmission = Omit<
  DeepNonNullable<TimelinePhotoCreateWithTimestampFormValues>,
  "timezone"
>;

const TimelinePhotoCreateWithTimestampForm: FC<
  TimelinePhotoCreateWithTimestampFormProps
> = ({ onCreate, ...otherProps }) => {
  // == Form
  const { values, onSubmit, reset, getInputProps, setErrors } = useForm<
    TimelinePhotoCreateWithTimestampFormValues,
    (
      values: TimelinePhotoCreateWithTimestampFormValues,
    ) => TimelinePhotoCreateWithTimestampFormSubmission
  >({
    initialValues: {
      photo: null,
      timestamp: "",
      timezone: "America/Vancouver",
    },
    transformValues: ({ photo, timestamp, timezone }) => {
      invariant(photo, "Missing photo");
      return {
        photo,
        timestamp: DateTime.fromISO(timestamp)
          .setZone(timezone, { keepLocalTime: true })
          .toISO(),
      };
    },
  });

  // == Photo Creation
  const onCreatePhotoError = useApolloAlertCallback(
    "Failed to import timeline photo",
  );
  const [createPhoto, { loading: creatingPhoto }] = useMutation(
    CreateTimelinePhotoWithTimestampMutationDocument,
    {
      onCompleted: ({ payload: { success, errors } }) => {
        if (success) {
          onCreate?.();
          reset();
          showNotice({ message: "Created timeline photo successfully" });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = buildFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't create photo");
        }
      },
      onError: onCreatePhotoError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        createPhoto({
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
        <Stack gap={8}>
          <FileField
            label="Photo"
            fileLabel="photo"
            required
            accept={["image/png", "image/jpeg"]}
            {...getInputProps("photo")}
          />
          <DateTimePicker
            label="Timestamp"
            valueFormat="YYYY-MM-DDTHH:mm:ss.SSSZ"
            required
            {...getInputProps("timestamp")}
          />
          <Radio.Group label="Timezone" required {...getInputProps("timezone")}>
            <Group gap="md" wrap="nowrap" mt={4}>
              <Radio label="PST" value="America/Vancouver" />
              <Radio label="EST" value="America/Toronto" />
            </Group>
          </Radio.Group>
        </Stack>
        <Button
          type="submit"
          disabled={!values.photo || !values.timestamp}
          loading={creatingPhoto}
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default TimelinePhotoCreateWithTimestampForm;
