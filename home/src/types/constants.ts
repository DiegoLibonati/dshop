export interface LangC {
  en: {
    presentation: LangPresentation;
    new_arrivals: LangNewArrivals;
    top_selling: LangTopSelling;
    browseByDressStyle: LangBrowseByDressStyle;
    ourHappyCustomers: LangOurHappyCustomers;
  };
}

export interface LangPresentation {
  title: string;
  description: string;
  button_shop_now: string;
  international_brands: string;
  high_quality_products: string;
  happy_customers: string;
}

export interface LangNewArrivals {
  title: string;
  button_view_all: string;
}

export interface LangTopSelling {
  title: string;
  button_view_all: string;
}

export interface LangBrowseByDressStyle {
  title: string;
}

export interface LangOurHappyCustomers {
  title: string;
}
