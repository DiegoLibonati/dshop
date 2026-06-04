import type { ColorCircleProps } from "@shared-core/types/props";

import ColorCircle from "@shared-core/components/Colors/ColorCircle/ColorCircle";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<ColorCircleProps>(ColorCircle);

export { mount, unmount };
