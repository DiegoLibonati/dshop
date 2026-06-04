import type { SvgHamburgerMenuProps } from "@shared-core/types/props";

import SvgHamburgerMenu from "@shared-core/components/Svgs/SvgHamburgerMenu/SvgHamburgerMenu";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgHamburgerMenuProps>(SvgHamburgerMenu);

export { mount, unmount };
