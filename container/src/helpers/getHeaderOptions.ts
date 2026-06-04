import type { HeaderOption, HeaderOptionId } from "@container/types/app";
import type { Locale } from "shared-core/sdk";

import { lang } from "@container/constants/lang";

export const getHeaderOptions = (lng: Locale): HeaderOption[] => {
  const options = lang[lng].header.options;

  return (Object.keys(options) as HeaderOptionId[]).map((optionId) => {
    const option = options[optionId];

    return {
      id: optionId,
      name: option,
      isMenu: false,
      open: false,
    };
  });
};
