import type { SvgCheckProps } from "@shared-core/types/props";

import SvgCheck from "@shared-core/components/Svgs/SvgCheck/SvgCheck";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgCheckProps>(SvgCheck);

export { mount, unmount };
