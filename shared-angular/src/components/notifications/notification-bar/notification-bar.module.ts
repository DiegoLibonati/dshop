import type { NotificationBarProps } from "@shared-angular/types/props";

import NotificationBarComponent from "@shared-angular/components/notifications/notification-bar/notification-bar.component";

import { createComponentMount } from "@shared-angular/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<NotificationBarProps>(NotificationBarComponent);

export { mount, unmount };
