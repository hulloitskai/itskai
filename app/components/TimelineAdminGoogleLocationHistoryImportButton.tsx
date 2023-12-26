import type { FC } from "react";
import UploadIcon from "~icons/heroicons/arrow-up-tray-20-solid";

import { FileButton } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

export type TimelineAdminGoogleLocationHistoryImportButtonProps = Omit<
  ButtonProps,
  "onClick"
> & {
  readonly uploadUrl: string;
};

const TimelineAdminGoogleLocationHistoryImportButton: FC<
  TimelineAdminGoogleLocationHistoryImportButtonProps
> = ({ uploadUrl, children, ...otherProps }) => {
  // == Routing
  const router = useRouter();

  // == Upload
  const resetRef = useRef<() => void>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <FileButton
      accept="application/json"
      onChange={file => {
        if (file) {
          const formData = new FormData();
          formData.set("google_location_history[file]", file);
          router.post(uploadUrl, formData, {
            onStart: () => {
              setUploading(true);
            },
            onFinish: () => {
              setUploading(false);
              resetRef.current?.();
            },
          });
        }
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
          {children ?? "Upload Google location history file"}
        </Button>
      )}
    </FileButton>
  );
};

export default TimelineAdminGoogleLocationHistoryImportButton;
