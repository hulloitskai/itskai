import { isNotEmpty } from "@mantine/form";

import { type Exploration } from "~/types";

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
  const { getInputProps, submitting, submit } = useFetchForm({
    name: "exploration-comment",
    action: routes.explorationComments.create,
    descriptor: "create comment",
    params: commentParams,
    initialValues: { message: "", author_contact: "" },
    validate: {
      message: isNotEmpty("Note is required"),
      author_contact: isNotEmpty("Author contact is required"),
    },
    transformValues: values => ({
      comment: values,
    }),
    onSuccess: () => {
      closeAllModals();
      toast.success("Note sent!", {
        description: "I'll get back to you soon :)",
      });
      onCommented?.();
    },
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Textarea
          {...getInputProps("message")}
          label="Note"
          placeholder="What is your experience with this like?"
          required
          autosize
          minRows={3}
          maxRows={6}
        />
        <TextInput
          {...getInputProps("author_contact")}
          label="Your @ or #"
          description="Your email or phone number, so I can chat with you about your note!"
          placeholder="+1 (123) 456-7890"
          required
        />
        <Group justify="end">
          <Button type="submit" leftSection={<SendIcon />} loading={submitting}>
            Submit
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default ExplorationCommentForm;
