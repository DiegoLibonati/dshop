import type { SvgArrowRightProps } from "@shared-core/types/props";

import SvgArrowRight from "@shared-core/components/Svgs/SvgArrowRight/SvgArrowRight";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgArrowRightProps>(SvgArrowRight);

export { mount, unmount };
