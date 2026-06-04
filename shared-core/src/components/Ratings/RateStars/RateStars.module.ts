import type { RateStarsProps } from "@shared-core/types/props";

import RateStars from "@shared-core/components/Ratings/RateStars/RateStars";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<RateStarsProps>(RateStars);

export { mount, unmount };
