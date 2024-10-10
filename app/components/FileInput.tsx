import { type InputWrapperProps } from "@mantine/core";
import { Input, Text } from "@mantine/core";
import { type DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import { useUncontrolled } from "@mantine/hooks";
import { type ReactNode } from "react";

import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";
import RejectIcon from "~icons/heroicons/no-symbol-20-solid";

import FileInputFileCard from "./FileInputFileCard";
import FileInputUploadCard from "./FileInputUploadCard";

import "@mantine/dropzone/styles.layer.css";

export interface FileValue {
  signedId: string;
}

export interface FileInputProps<Multiple = false>
  extends BoxProps,
    Pick<
      InputWrapperProps,
      | "variant"
      | "labelElement"
      | "label"
      | "labelProps"
      | "description"
      | "descriptionProps"
      | "error"
      | "errorProps"
      | "required"
      | "withAsterisk"
    >,
    Pick<
      DropzoneProps,
      "accept" | "maxSize" | "maxFiles" | "disabled" | "children"
    > {
  multiple?: Multiple;
  value?: Multiple extends true ? FileValue[] : FileValue | null;
  defaultValue?: Multiple extends true ? FileValue[] : FileValue | null;
  onChange?: (
    value: Multiple extends true ? FileValue[] : FileValue | null,
  ) => void;
  fileLabel?: string;
}

const FileInput = <Multiple extends boolean = false>(
  props: FileInputProps<Multiple>,
): ReactNode => {
  const {
    accept,
    children,
    defaultValue,
    description,
    descriptionProps,
    disabled,
    error,
    errorProps,
    fileLabel: fileLabelProp,
    label,
    labelElement,
    labelProps,
    maxFiles,
    maxSize,
    multiple,
    onChange,
    required,
    value,
    variant,
    withAsterisk,
    ...otherProps
  } = props;

  // == Value
  const [resolvedValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  type SingleHandleChange = (value: FileValue | null) => void;
  type MultipleHandleChange = (value: FileValue[]) => void;
  const resolvedValueRef = useRef(resolvedValue);
  useEffect(() => {
    resolvedValueRef.current = resolvedValue;
  }, [resolvedValue]);

  // == Uploading files
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  const fileLabel = useMemo(
    () => fileLabelProp ?? (multiple ? "files" : "file"),
    [fileLabelProp, multiple],
  );
  return (
    <Stack gap="xs" my={4} {...otherProps}>
      <Input.Wrapper
        {...{
          variant,
          labelElement,
          label,
          labelProps,
          description,
          descriptionProps,
          error,
          errorProps,
          required,
          withAsterisk,
        }}
      >
        <Dropzone
          multiple={multiple ?? false}
          {...{ accept, maxSize, maxFiles, disabled }}
          py="lg"
          onDrop={files => {
            if (!multiple && value) {
              (handleChange as SingleHandleChange)(null);
            }
            setUploadingFiles(prevFiles =>
              uniqBy([...prevFiles, ...files], "name"),
            );
          }}
        >
          <Stack align="center" gap={4}>
            <Dropzone.Accept>
              <Box component={SuccessIcon} c="green" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Box component={RejectIcon} c="red" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Box component={UploadIcon} c="primary" />
            </Dropzone.Idle>
            <Text size="sm" c="dimmed" lh={1.3} ta="center" maw={270}>
              {children ??
                `Drop ${fileLabel} here or click to select ${fileLabel}`}
            </Text>
          </Stack>
        </Dropzone>
      </Input.Wrapper>
      {!isEmpty(uploadingFiles) && (
        <>
          <Divider label="Uploading" />
          <Stack gap={8}>
            {uploadingFiles.map(file => (
              <FileInputUploadCard
                key={file.name}
                onUploaded={blob => {
                  setUploadingFiles(prevFiles =>
                    prevFiles.filter(({ name }) => name !== file.name),
                  );
                  if (multiple) {
                    const currentValue =
                      resolvedValueRef.current as FileValue[];
                    const value = [
                      ...(currentValue ?? []),
                      { signedId: blob.signed_id },
                    ];
                    (handleChange as MultipleHandleChange)(value);
                  } else {
                    const value = { signedId: blob.signed_id };
                    (handleChange as SingleHandleChange)(value);
                  }
                }}
                {...{ file }}
              />
            ))}
          </Stack>
        </>
      )}
      {!!resolvedValue && !isEmpty(resolvedValue) && (
        <>
          <Divider label="Ready" />
          <Stack gap={8}>
            {Array.isArray(resolvedValue) ? (
              resolvedValue.map(({ signedId }) => (
                <FileInputFileCard
                  key={signedId}
                  onRemove={() => {
                    const currentValue =
                      resolvedValueRef.current as FileValue[];
                    const value = (currentValue ?? []).filter(
                      blob => blob.signedId !== signedId,
                    );
                    (handleChange as MultipleHandleChange)(value);
                  }}
                  {...{ signedId }}
                />
              ))
            ) : (
              <FileInputFileCard
                onRemove={() => {
                  (handleChange as SingleHandleChange)(null);
                }}
                signedId={resolvedValue.signedId}
              />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default FileInput;
