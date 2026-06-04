import type { SvgTwitterProps } from "@shared-core/types/props";

import SvgTwitter from "@shared-core/components/Svgs/SvgTwitter/SvgTwitter";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgTwitterProps>(SvgTwitter);

export { mount, unmount };
