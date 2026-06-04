import type { SvgSearchProps } from "@shared-core/types/props";

import SvgSearch from "@shared-core/components/Svgs/SvgSearch/SvgSearch";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgSearchProps>(SvgSearch);

export { mount, unmount };
