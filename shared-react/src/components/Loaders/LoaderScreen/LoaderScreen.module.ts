import type { LoaderScreenProps } from "@shared-react/types/props";

import LoaderScreen from "@shared-react/components/Loaders/LoaderScreen/LoaderScreen";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<LoaderScreenProps>(LoaderScreen);

export { mount, unmount };
