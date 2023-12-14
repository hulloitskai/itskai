import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import {
  JourneysSessionParticipationFormQueryDocument,
  UpdateJourneysSessionParticipationMutationDocument,
} from "~/helpers/graphql";

export type JourneysSessionParticipationFormProps = BoxProps & {
  readonly participationId: string;
};

type JourneysSessionParticipationFormValues = {
  readonly participantName: string;
  readonly goal: string;
};

const JourneysSessionParticipationForm: FC<
  JourneysSessionParticipationFormProps
> = ({ participationId, ...otherProps }) => {
  // == Form
  const { getInputProps, onSubmit, setValues, resetDirty, isDirty } =
    useForm<JourneysSessionParticipationFormValues>({
      initialValues: {
        participantName: "",
        goal: "",
      },
    });

  // == Query
  const { data } = useQuery(JourneysSessionParticipationFormQueryDocument, {
    variables: {
      participationId,
    },
    onCompleted: ({ participation }) => {
      if (participation) {
        console.log({ participation });
        const { participantName, goal } = participation;
        setValues({ participantName, goal });
        resetDirty();
      }
    },
  });

  // == Mutation
  const onError = useApolloAlertCallback(
    "Failed to update participation information",
  );
  const [runMutation] = useMutation(
    UpdateJourneysSessionParticipationMutationDocument,
    {
      onError,
    },
  );

  return (
    <Box
      component="form"
      pos="relative"
      onSubmit={onSubmit(values => {
        runMutation({
          variables: {
            input: {
              participationId,
              ...values,
            },
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="sm">
        <Stack gap={8}>
          <TextInput
            label="My name is"
            placeholder="anonymous monkey"
            {...getInputProps("participantName")}
          />
          <Textarea
            label="And for this session, I will"
            placeholder="learn how to draw!"
            autosize
            {...getInputProps("goal")}
          />
        </Stack>
        <Button type="submit" disabled={!data || !isDirty()}>
          Save
        </Button>
      </Stack>
      <LoadingOverlay visible={!data} />
    </Box>
  );
};

export default JourneysSessionParticipationForm;
