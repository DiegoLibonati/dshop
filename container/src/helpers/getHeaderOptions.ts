import { HeaderOption, HeaderOptionId } from "@src/entities/app";

import { lang } from "@src/constants/lang";

import { Locale } from "shared_core/SharedCoreEntities";

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
