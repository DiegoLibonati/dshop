import type { FooterSectionId } from "@container/types/app";

import { getFooterLinks } from "@container/helpers/getFooterLinks";

import { FOOTER_LINKS } from "@container/constants/components";
import { lang } from "@container/constants/lang";

describe("getFooterLinks", () => {
  it("should return one section per configured footer entry", () => {
    const sections = getFooterLinks("en");

    expect(sections).toHaveLength(Object.keys(lang.en.footer.sections).length);
  });

  it("should map each section id and title from the language config", () => {
    const sections = getFooterLinks("en");

    const expectedIds: FooterSectionId[] = ["company", "help", "faq", "resources"];

    expect(sections.map((section) => section.id)).toEqual(expectedIds);
    expect(sections.map((section) => section.title)).toEqual([
      lang.en.footer.sections.company.title,
      lang.en.footer.sections.help.title,
      lang.en.footer.sections.faq.title,
      lang.en.footer.sections.resources.title,
    ]);
  });

  it("should pair each content title with its configured link", () => {
    const sections = getFooterLinks("en");

    const company = sections.find((section) => section.id === "company");

    expect(company?.content).toEqual([
      {
        title: lang.en.footer.sections.company.items.whoWeAre,
        link: FOOTER_LINKS.company.whoWeAre,
      },
      { title: lang.en.footer.sections.company.items.ourTeam, link: FOOTER_LINKS.company.ourTeam },
      { title: lang.en.footer.sections.company.items.careers, link: FOOTER_LINKS.company.careers },
      {
        title: lang.en.footer.sections.company.items.newsroom,
        link: FOOTER_LINKS.company.newsroom,
      },
    ]);
  });

  it("should expose a non-empty link for every content item", () => {
    const sections = getFooterLinks("en");

    const everyLinkPresent = sections.every((section) =>
      section.content.every((item) => item.link.length > 0)
    );

    expect(everyLinkPresent).toBe(true);
  });
});
