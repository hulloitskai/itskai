import React, { FC } from "react";
import { Box, BoxProps } from "@mantine/core";

export type InputIconProps = BoxProps;

const InputIcon: FC<InputIconProps> = ({ children, ...otherProps }) => (
  <Box sx={{ width: 20, height: 20 }} {...otherProps}>
    {children}
  </Box>
);

export default InputIcon;
