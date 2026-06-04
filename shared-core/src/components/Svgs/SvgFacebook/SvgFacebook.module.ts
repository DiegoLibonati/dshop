import type { SvgFacebookProps } from "@shared-core/types/props";

import SvgFacebook from "@shared-core/components/Svgs/SvgFacebook/SvgFacebook";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SvgFacebookProps>(SvgFacebook);

export { mount, unmount };
