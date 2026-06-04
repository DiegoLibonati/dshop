import type { SvgChevronDownProps } from "@shared-core/types/props";

import SvgChevronDown from "@shared-core/components/Svgs/SvgChevronDown/SvgChevronDown";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgChevronDownProps>(SvgChevronDown);

export { mount, unmount };
