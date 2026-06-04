import type { SkeletonShimmerProps } from "@shared-core/types/props";

import SkeletonShimmer from "@shared-core/components/Skeletons/SkeletonShimmer/SkeletonShimmer";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SkeletonShimmerProps>(SkeletonShimmer);

export { mount, unmount };
