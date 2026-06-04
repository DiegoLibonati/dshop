import type { SvgArrowLeftProps } from "@shared-core/types/props";

import SvgArrowLeft from "@shared-core/components/Svgs/SvgArrowLeft/SvgArrowLeft";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgArrowLeftProps>(SvgArrowLeft);

export { mount, unmount };
