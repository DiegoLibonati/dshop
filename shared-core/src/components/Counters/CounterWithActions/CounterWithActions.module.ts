import type { CounterWithActionsProps } from "@shared-core/types/props";

import CounterWithActions from "@shared-core/components/Counters/CounterWithActions/CounterWithActions";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<CounterWithActionsProps>(CounterWithActions);

export { mount, unmount };
