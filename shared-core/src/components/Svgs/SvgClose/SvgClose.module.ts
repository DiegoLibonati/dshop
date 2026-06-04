import type { SvgCloseProps } from "@shared-core/types/props";

import SvgClose from "@shared-core/components/Svgs/SvgClose/SvgClose";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgCloseProps>(SvgClose);

export { mount, unmount };
