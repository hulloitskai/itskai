import type { ReactNode } from "react";

import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";
import RejectIcon from "~icons/heroicons/no-symbol-20-solid";

import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";

import { Input, Text } from "@mantine/core";
import type { BoxProps, InputWrapperProps } from "@mantine/core";

import FileFieldUploadCard from "./FileFieldUploadCard";
import FileFieldFileCard from "./FileFieldFileCard";

import "@mantine/dropzone/styles.layer.css";

export type FileValue = { signedId: string };

export interface FileFieldProps<Multiple = false>
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
  onChange?: (
    value: Multiple extends true ? FileValue[] : FileValue | null,
  ) => void;
  fileLabel?: string;
}

const FileField = <Multiple extends boolean = false>(
  props: FileFieldProps<Multiple>,
): ReactNode => {
  const {
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
    accept,
    maxSize,
    maxFiles,
    disabled,
    children,
    multiple,
    fileLabel: fileLabelProp,
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: _onChange,
    ...otherProps
  } = props;

  // == Value
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // == Files
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
          onDrop={files => {
            if (!multiple && value) {
              const { onChange } = props as FileFieldProps<false>;
              onChange?.(null);
            }
            setUploadingFiles(prevFiles =>
              uniqBy([...prevFiles, ...files], "name"),
            );
          }}
          py="lg"
          {...{ accept, maxSize, maxFiles, disabled }}
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
            <Text
              size="sm"
              c="dimmed"
              lh={1.3}
              maw={270}
              style={{ textAlign: "center" }}
            >
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
              <FileFieldUploadCard
                key={file.name}
                onUploaded={blob => {
                  setUploadingFiles(prevFiles =>
                    prevFiles.filter(({ name }) => name !== file.name),
                  );
                  if (multiple) {
                    const { onChange } = props as FileFieldProps<true>;
                    const value = valueRef.current as FileValue[];
                    onChange?.([
                      ...(value ?? []),
                      { signedId: blob.signed_id },
                    ]);
                  } else {
                    const { onChange } = props as FileFieldProps<false>;
                    onChange?.({ signedId: blob.signed_id });
                  }
                }}
                {...{ file }}
              />
            ))}
          </Stack>
        </>
      )}
      {!isEmpty(value) && (
        <>
          <Divider label="Ready" />
          <Stack gap={8}>
            {multiple ? (
              ((value ?? []) as string[]).map(signedId => (
                <FileFieldFileCard
                  key={signedId}
                  onRemove={() => {
                    const { onChange } = props as FileFieldProps<true>;
                    const value = valueRef.current as FileValue[];
                    onChange?.(
                      (value ?? []).filter(blob => blob.signedId !== signedId),
                    );
                  }}
                  {...{ signedId }}
                />
              ))
            ) : (
              <FileFieldFileCard
                onRemove={() => {
                  const { onChange } = props as FileFieldProps<false>;
                  onChange?.(null);
                }}
                signedId={value as string}
              />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default FileField;
