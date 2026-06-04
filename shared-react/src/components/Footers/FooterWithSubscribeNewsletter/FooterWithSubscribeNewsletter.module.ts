import type { FooterWithSubscribeNewsletterProps } from "@shared-react/types/props";

import FooterWithSubscribeNewsletter from "@shared-react/components/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter";

import { createComponentMount } from "@shared-react/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<FooterWithSubscribeNewsletterProps>(
  FooterWithSubscribeNewsletter
);

export { mount, unmount };
