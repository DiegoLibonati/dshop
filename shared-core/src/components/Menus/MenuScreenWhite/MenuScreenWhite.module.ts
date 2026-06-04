import type { MenuScreenWhiteProps } from "@shared-core/types/props";

import MenuScreenWhite from "@shared-core/components/Menus/MenuScreenWhite/MenuScreenWhite";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<MenuScreenWhiteProps>(MenuScreenWhite);

export { mount, unmount };
