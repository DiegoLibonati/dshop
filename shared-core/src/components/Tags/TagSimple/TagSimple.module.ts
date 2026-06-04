import type { TagSimpleProps } from "@shared-core/types/props";

import TagSimple from "@shared-core/components/Tags/TagSimple/TagSimple";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<TagSimpleProps>(TagSimple);

export { mount, unmount };
