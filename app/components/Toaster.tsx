import {
  Toaster as _Toaster,
  type ToasterProps as _ToasterProps,
} from "sonner";

import classes from "./Toaster.module.css";

export interface ToasterProps extends _ToasterProps {}

const Toaster: FC<ToasterProps> = ({ toastOptions, ...otherProps }) => (
  <_Toaster
    position="bottom-right"
    closeButton
    toastOptions={{
      ...toastOptions,
      className: cn(toastOptions?.className, classes.toast),
    }}
    {...otherProps}
  />
);

export default Toaster;
