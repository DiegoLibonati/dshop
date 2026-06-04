import type { SubscribeNewsletterProps } from "@shared-react/types/props";

import SubscribeNewsletter from "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<SubscribeNewsletterProps>(SubscribeNewsletter);

export { mount, unmount };
