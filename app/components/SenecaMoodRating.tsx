import type { FC } from "react";

import { InputWrapper, Loader, Rating, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { CreateSenecaMoodLogMutationDocument } from "~/helpers/graphql";

export type SenecaMoodRatingProps = BoxProps;

type SenecaMoodRatingFormValues = {
  readonly valence?: number;
};

type SenecaMoodRatingFormSubmission = Required<SenecaMoodRatingFormValues>;

const SenecaMoodRating: FC<BoxProps> = ({ ...otherProps }) => {
  // == Form
  const { values, getInputProps, setErrors, onSubmit } = useForm<
    SenecaMoodRatingFormValues,
    (values: SenecaMoodRatingFormValues) => SenecaMoodRatingFormSubmission
  >({
    initialValues: {},
    transformValues: ({ valence }) => {
      if (!valence) {
        throw new Error("Missing valence");
      }
      return {
        valence: valence,
      };
    },
  });

  // == Mutation
  const onError = useApolloAlertCallback("Failed to create mood log");
  const [runMutation, { data, loading }] = useMutation(
    CreateSenecaMoodLogMutationDocument,
    {
      onCompleted: ({ payload: { errors } }) => {
        if (errors) {
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't create mood log");
        }
      },
      onError,
    },
  );
  const { log } = data?.payload ?? {};

  // == Submission
  const handleSubmit = onSubmit(values => {
    runMutation({
      variables: {
        input: {
          ...values,
        },
      },
    });
  });
  useDidUpdate(handleSubmit, [values.valence]);

  return (
    <InputWrapper {...otherProps}>
      <Group gap="xs" mb={4}>
        <Rating
          count={10}
          size="lg"
          color="pink.5"
          {...getInputProps("valence")}
        />
        {loading && <Loader type="dots" size="xs" />}
      </Group>
      {log && (
        <Text size="xs" c="var(--mantine-color-white)">
          Ok! Thanks for letting me know &lt;3
        </Text>
      )}
    </InputWrapper>
  );
};

export default SenecaMoodRating;
