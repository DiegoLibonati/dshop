import type { GalleryClothesProps } from "@shared-react/types/props";

import GalleryClothes from "@shared-react/components/Galleries/GalleryClothes/GalleryClothes";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<GalleryClothesProps>(GalleryClothes);

export { mount, unmount };
