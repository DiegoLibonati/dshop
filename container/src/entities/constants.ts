import { FooterSectionId } from "@src/entities/app";

export type LangC = {
  en: {
    header: LangHeader;
    footer: LangFooter;
    notifications: LangNotifications;
  };
};

export type LangHeader = {
  options: {
    shop: string;
    onSale: string;
    newArrivals: string;
    brands: string;
  };
  placeholder: string;
};

export type LangFooter = {
  description: string;
  sections: Record<FooterSectionId, LangFooterSection>;
};
export type LangFooterSection = {
  title: string;
  items: Record<string, string>;
};

export type LangNotifications = {
  bar: string;
};
