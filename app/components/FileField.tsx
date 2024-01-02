import type { FC } from "react";
import type { UseFormReturnType } from "@mantine/form";
import type { UploadInput } from "~/helpers/graphql";

import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";
import RejectIcon from "~icons/heroicons/no-symbol-20-solid";

import { Dropzone } from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";

import { Input, Text } from "@mantine/core";
import type { InputWrapperProps } from "@mantine/core";

import FileFieldUploadCard from "./FileFieldUploadCard";
import FileFieldFileCard from "./FileFieldFileCard";

import "@mantine/dropzone/styles.layer.css";

export type FileFieldProps = Omit<
  InputWrapperProps,
  "inputContainer" | "inputWrapperOrder" | "size" | "children" | "onChange"
> &
  Pick<
    DropzoneProps,
    "accept" | "maxSize" | "maxFiles" | "disabled" | "children"
  > & {
    readonly multiple?: boolean;
    readonly fileLabel?: string;
    readonly form: UseFormReturnType<any>;
    readonly name: string;
  };

const FileField: FC<FileFieldProps> = ({
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
  style,
  multiple,
  accept,
  maxSize,
  maxFiles,
  disabled,
  children,
  fileLabel: fileLabelProp,
  form,
  name,
}) => {
  const value = useMemo(() => get(form.values, name), [form, name]);

  // == Uploading
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  // == Text
  const fileLabel = useMemo(
    () => fileLabelProp ?? (multiple ? "files" : "file"),
    [fileLabelProp, multiple],
  );

  return (
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
        style,
      }}
    >
      <Stack gap="xs" my={4}>
        <Dropzone
          multiple={multiple ?? false}
          onDrop={files => {
            if (!multiple) {
              form.setFieldValue(name, null);
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
                    const input: UploadInput = { signedId: blob.signed_id };
                    if (multiple) {
                      form.insertListItem(name, input);
                    } else {
                      form.setFieldValue(name, input);
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
                ((value ?? []) as UploadInput[]).map(({ signedId }, index) => (
                  <FileFieldFileCard
                    key={signedId}
                    onRemove={() => {
                      form.removeListItem(name, index);
                    }}
                    {...{ signedId }}
                  />
                ))
              ) : (
                <FileFieldFileCard
                  onRemove={() => {
                    form.setFieldError(name, null);
                  }}
                  signedId={(value as UploadInput).signedId}
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Input.Wrapper>
  );
};

export default FileField;
