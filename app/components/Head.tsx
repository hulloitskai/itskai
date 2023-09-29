import type { ComponentProps, FC } from "react";
import { Head as _Head } from "@inertiajs/react";

export type HeadProps = ComponentProps<typeof _Head>;

const Head: FC<HeadProps> = _Head;

export default Head;
