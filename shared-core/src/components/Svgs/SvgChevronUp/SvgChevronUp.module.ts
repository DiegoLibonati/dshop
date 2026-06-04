import type { SvgChevronUpProps } from "@shared-core/types/props";

import SvgChevronUp from "@shared-core/components/Svgs/SvgChevronUp/SvgChevronUp";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgChevronUpProps>(SvgChevronUp);

export { mount, unmount };
