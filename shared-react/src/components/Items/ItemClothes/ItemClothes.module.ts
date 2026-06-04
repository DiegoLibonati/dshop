import type { ItemClothesProps } from "@shared-react/types/props";

import ItemClothes from "@shared-react/components/Items/ItemClothes/ItemClothes";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<ItemClothesProps>(ItemClothes);

export { mount, unmount };
