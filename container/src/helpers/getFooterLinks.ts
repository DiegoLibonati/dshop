import { FooterSection, FooterSectionId } from "@src/entities/app";

import { lang } from "@src/constants/lang";
import { FOOTER_LINKS } from "@src/constants/components";

import { Locale } from "shared_core/SharedCoreEntities";

export const getFooterLinks = (lng: Locale): FooterSection[] => {
  const sections = lang[lng].footer.sections;

  return (Object.keys(sections) as FooterSectionId[]).map((sectionId) => {
    const section = sections[sectionId];

    return {
      id: sectionId,
      title: section.title,
      content: Object.keys(section.items).map((itemId) => ({
        title: section.items[itemId],
        link: FOOTER_LINKS[sectionId][itemId],
      })),
    };
  });
};
