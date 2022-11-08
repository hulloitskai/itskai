import type { FC, PropsWithChildren } from "react";

import { InertiaHeadProps } from "@inertiajs/inertia-react";
import { Head as _Head } from "@inertiajs/inertia-react";

export type HeadProps = PropsWithChildren<InertiaHeadProps>;
const Head: FC<HeadProps> = _Head;

export default Head;
