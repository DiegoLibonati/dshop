import type { HeaderProps } from "@shared-angular/types/props";

import HeaderComponent from "@shared-angular/components/headers/header/header.component";

import { createComponentMount } from "@shared-angular/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<HeaderProps>(HeaderComponent);

export { mount, unmount };
