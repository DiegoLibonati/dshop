import type { AnchorCircularProps } from "@shared-core/types/props";

import AnchorCircular from "@shared-core/components/Anchors/AnchorCircular/AnchorCircular";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<AnchorCircularProps>(AnchorCircular);

export { mount, unmount };
