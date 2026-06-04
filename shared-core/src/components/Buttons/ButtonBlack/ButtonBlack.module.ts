import type { ButtonBlackProps } from "@shared-core/types/props";

import ButtonBlack from "@shared-core/components/Buttons/ButtonBlack/ButtonBlack";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<ButtonBlackProps>(ButtonBlack);

export { mount, unmount };
