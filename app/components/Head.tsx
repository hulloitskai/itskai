import type { FC, PropsWithChildren } from "react";

import { Head as _Head } from "@inertiajs/react";

export type HeadProps = PropsWithChildren<{ title?: string }>;
const Head: FC<HeadProps> = _Head;

export default Head;
