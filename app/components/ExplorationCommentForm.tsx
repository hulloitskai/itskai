import type { Exploration } from "~/types";
import { isNotEmpty } from "@mantine/form";

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
  const { getInputProps, submit, processing } = useFetchForm({
    action: routes.explorations.comment,
    method: "post",
    descriptor: "create comment",
    params: commentParams,
    // mode: "uncontrolled",
    initialValues: { message: "", authorContact: "" },
    validate: {
      message: isNotEmpty("Note is required"),
      authorContact: isNotEmpty("Author contact is required"),
    },
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
          {...getInputProps("authorContact")}
          label="Your @ or #"
          description="Your email or phone number, so I can chat with you about your note!"
          placeholder="+1 (123) 456-7890"
          required
        />
        <Group justify="end">
          <Button type="submit" leftSection={<SendIcon />} loading={processing}>
            Submit
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default ExplorationCommentForm;
