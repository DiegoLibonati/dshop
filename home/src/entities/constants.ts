export type LangC = {
  en: {
    presentation: LangPresentation;
    new_arrivals: LangNewArrivals;
    top_selling: LangTopSelling;
    browseByDressStyle: LangBrowseByDressStyle;
    ourHappyCustomers: LangOurHappyCustomers;
  };
};

export type LangPresentation = {
  title: string;
  description: string;
  button_shop_now: string;
  international_brands: string;
  high_quality_products: string;
  happy_customers: string;
};

export type LangNewArrivals = {
  title: string;
  button_view_all: string;
};

export type LangTopSelling = {
  title: string;
  button_view_all: string;
};

export type LangBrowseByDressStyle = {
  title: string;
};

export type LangOurHappyCustomers = {
  title: string;
};
