import type { SvgStarToFillProps } from "@shared-core/types/props";

import SvgStarToFill from "@shared-core/components/Svgs/SvgStarToFill/SvgStarToFill";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgStarToFillProps>(SvgStarToFill);

export { mount, unmount };
