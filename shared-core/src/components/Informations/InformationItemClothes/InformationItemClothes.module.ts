import type { InformationItemClothesProps } from "@shared-core/types/props";

import InformationItemClothes from "@shared-core/components/Informations/InformationItemClothes/InformationItemClothes";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } =
  createComponentMount<InformationItemClothesProps>(InformationItemClothes);

export { mount, unmount };
