import _EmojiPicker, {
  EmojiStyle,
  type PickerProps,
  Theme,
} from "emoji-picker-react";

import classes from "./EmojiPicker.module.css";

export interface EmojiPickerProps extends PickerProps {}

const EmojiPicker: FC<EmojiPickerProps> = ({ className, ...otherProps }) => (
  <_EmojiPicker
    className={cn("EmojiPicker", classes.picker, className)}
    autoFocusSearch
    previewConfig={{ showPreview: false }}
    emojiStyle={EmojiStyle.NATIVE}
    skinTonesDisabled
    theme={Theme.AUTO}
    width={300}
    height={375}
    {...otherProps}
  />
);

export default EmojiPicker;
