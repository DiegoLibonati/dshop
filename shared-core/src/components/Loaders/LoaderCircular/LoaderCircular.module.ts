import type { LoaderCircularProps } from "@shared-core/types/props";

import LoaderCircular from "@shared-core/components/Loaders/LoaderCircular/LoaderCircular";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<LoaderCircularProps>(LoaderCircular);

export { mount, unmount };
