import type { ReviewCustomerProps } from "@shared-angular/types/props";

import ReviewCustomerComponent from "@shared-angular/components/reviews/review-customer/review-customer.component";

import { createComponentMount } from "@shared-angular/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<ReviewCustomerProps>(ReviewCustomerComponent);

export { mount, unmount };
