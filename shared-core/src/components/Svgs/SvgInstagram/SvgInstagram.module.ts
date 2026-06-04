import type { SvgInstagramProps } from "@shared-core/types/props";

import SvgInstagram from "@shared-core/components/Svgs/SvgInstagram/SvgInstagram";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgInstagramProps>(SvgInstagram);

export { mount, unmount };
