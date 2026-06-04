import type { SliderSnapXProps } from "@shared-core/types/props";

import SliderSnapX from "@shared-core/components/Sliders/SliderSnapX/SliderSnapX";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SliderSnapXProps>(SliderSnapX);

export { mount, unmount };
