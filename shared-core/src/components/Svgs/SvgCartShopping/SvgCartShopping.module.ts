import type { SvgCartShoppingProps } from "@shared-core/types/props";

import SvgCartShopping from "@shared-core/components/Svgs/SvgCartShopping/SvgCartShopping";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgCartShoppingProps>(SvgCartShopping);

export { mount, unmount };
