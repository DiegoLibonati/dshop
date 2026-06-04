import type { FormSearchProps } from "@shared-core/types/props";

import FormSearch from "@shared-core/components/Forms/FormSearch/FormSearch";

import { createComponentMount } from "@shared-core/helpers/createComponentMount";

const { mount, unmount } = createComponentMount<FormSearchProps>(FormSearch);

export { mount, unmount };
