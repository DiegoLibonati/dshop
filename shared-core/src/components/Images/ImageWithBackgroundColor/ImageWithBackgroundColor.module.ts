import type { ImageWithBackgroundColorProps } from "@shared-core/types/props";

import ImageWithBackgroundColor from "@shared-core/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } =
  createComponentMount<ImageWithBackgroundColorProps>(ImageWithBackgroundColor);

export { mount, unmount };
