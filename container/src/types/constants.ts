import type { FooterSectionId } from "@container/types/app";

export interface LangC {
  en: {
    header: LangHeader;
    footer: LangFooter;
    notifications: LangNotifications;
  };
}

export interface LangHeader {
  options: {
    shop: string;
    onSale: string;
    newArrivals: string;
    brands: string;
  };
  placeholder: string;
}

export interface LangFooter {
  description: string;
  sections: Record<FooterSectionId, LangFooterSection>;
}
export interface LangFooterSection {
  title: string;
  items: Record<string, string>;
}

export interface LangNotifications {
  bar: string;
}
