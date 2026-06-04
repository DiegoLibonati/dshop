import type { SvgSkyStarProps } from "@shared-core/types/props";

import SvgSkyStar from "@shared-core/components/Svgs/SvgSkyStar/SvgSkyStar";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgSkyStarProps>(SvgSkyStar);

export { mount, unmount };
