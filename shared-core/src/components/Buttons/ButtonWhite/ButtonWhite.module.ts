import type { ButtonWhiteProps } from "@shared-core/types/props";

import ButtonWhite from "@shared-core/components/Buttons/ButtonWhite/ButtonWhite";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<ButtonWhiteProps>(ButtonWhite);

export { mount, unmount };
