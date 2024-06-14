import type { ComponentPropsWithoutRef, FC } from "react";
import type { Exploration } from "~/types";
import type { BoxProps } from "@mantine/core";

export interface ExplorationCommentFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  exploration: Exploration;
  onCommented?: () => void;
}

const ExplorationCommentForm: FC<ExplorationCommentFormProps> = ({
  exploration,
  onCommented,
  ...otherProps
}) => {
  const commentParams = useMemo(
    () => ({ exploration_id: exploration.id }),
    [exploration.id],
  );
  const { values, getInputProps, isDirty, submit, processing } = useFetchForm({
    action: routes.explorations.comment,
    method: "post",
    descriptor: "create comment",
    params: commentParams,
    initialValues: { message: "", authorContact: "" },
    transformValues: values => ({
      comment: values,
    }),
    onSuccess: () => {
      closeAllModals();
      showNotice({
        title: "Note sent!",
        message: "I'll get back to you soon :)",
      });
      onCommented?.();
    },
  });
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "message",
    "authorContact",
  );
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Textarea
          label="Note"
          placeholder="What is your experience with this like?"
          required
          autosize
          minRows={3}
          maxRows={6}
          {...getInputProps("message")}
        />
        <TextInput
          label="Your @ or #"
          description="Your email or phone number, so I can chat with you about your note!"
          placeholder="+1 (123) 456-7890"
          required
          {...getInputProps("authorContact")}
        />
        <Group justify="end">
          <Button
            type="submit"
            leftSection={<SendIcon />}
            disabled={!isDirty() || !requiredFieldsFilled}
            loading={processing}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default ExplorationCommentForm;
