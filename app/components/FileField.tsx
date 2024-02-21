import type { ReactNode } from "react";
import type { UseFormReturnType } from "@mantine/form";
import type { UploadInput } from "~/helpers/graphql";

import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";
import RejectIcon from "~icons/heroicons/no-symbol-20-solid";

import { Dropzone } from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";

import { Input, Text } from "@mantine/core";
import type { BoxProps, InputWrapperProps } from "@mantine/core";
import type { LooseKeys } from "@mantine/form/lib/types";

import FileFieldUploadCard from "./FileFieldUploadCard";
import FileFieldFileCard from "./FileFieldFileCard";

import "@mantine/dropzone/styles.layer.css";

export type FileFieldProps<Values = Record<string, unknown>> = BoxProps &
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
  > &
  Pick<
    DropzoneProps,
    "accept" | "maxSize" | "maxFiles" | "disabled" | "children"
  > & {
    readonly multiple?: boolean;
    readonly fileLabel?: string;
    readonly form: UseFormReturnType<Values, any>;
    readonly name: LooseKeys<Values>;
  };

const FileField = <Values = Record<string, unknown>,>({
  variant,
  labelElement,
  label,
  labelProps,
  description,
  descriptionProps,
  error: errorProp,
  errorProps,
  required,
  withAsterisk,
  multiple,
  accept,
  maxSize,
  maxFiles,
  disabled,
  children,
  fileLabel: fileLabelProp,
  form,
  name,
  ...otherProps
}: FileFieldProps<Values>): ReactNode => {
  const value = useMemo<UploadInput | UploadInput[] | null | undefined>(
    () => get(form.values, name),
    [form, name],
  );
  const error = useMemo<string | undefined>(
    () => get(form.errors, name) || errorProp,
    [form, name, errorProp],
  );

  // == Uploading
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  // == Text
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
            if (!multiple) {
              form.setFieldValue(name, null as any);
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
                  const input: UploadInput = { signedId: blob.signed_id };
                  if (multiple) {
                    form.insertListItem(name, input);
                  } else {
                    form.setFieldValue(name, input as any);
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
  );
};

export default FileField;
