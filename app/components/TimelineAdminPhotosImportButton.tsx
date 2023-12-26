import type { FC } from "react";
import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";

import { FileButton } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

export type TimelineAdminPhotosImportButtonProps = Omit<
  ButtonProps,
  "onClick"
> & {
  readonly uploadUrl: string;
};

const TimelineAdminPhotosImportButton: FC<
  TimelineAdminPhotosImportButtonProps
> = ({ uploadUrl, children, ...otherProps }) => {
  // == Routing
  const router = useRouter();

  // == Upload
  const resetRef = useRef<() => void>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <FileButton
      accept="image/png,image/jpeg"
      multiple
      onChange={files => {
        const formData = new FormData();
        files.forEach(file => {
          formData.append("photos[files][]", file);
        });
        router.post(uploadUrl, formData, {
          onStart: () => {
            setUploading(true);
          },
          onFinish: () => {
            setUploading(false);
            resetRef.current?.();
          },
        });
      }}
      {...{ resetRef }}
    >
      {props => (
        <Button
          variant="default"
          leftSection={<UploadIcon />}
          loading={uploading}
          {...otherProps}
          {...props}
        >
          {children ?? "Upload timeline photos"}
        </Button>
      )}
    </FileButton>
  );
};

export default TimelineAdminPhotosImportButton;
