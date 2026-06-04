import type { FooterSection, FooterSectionId } from "@container/types/app";
import type { Locale } from "shared-core/sdk";

import { FOOTER_LINKS } from "@container/constants/components";
import { lang } from "@container/constants/lang";

export const getFooterLinks = (lng: Locale): FooterSection[] => {
  const sections = lang[lng].footer.sections;

  return (Object.keys(sections) as FooterSectionId[]).map((sectionId) => {
    const section = sections[sectionId];

    return {
      id: sectionId,
      title: section.title,
      content: Object.keys(section.items).map((itemId) => ({
        title: section.items[itemId]!,
        link: FOOTER_LINKS[sectionId][itemId]!,
      })),
    };
  });
};
