export interface LangC {
  en: {
    productInformation: LangProductInformation;
    reviews: LangReviews;
    youMightAlsoLike: LangYouMightAlsoLike;
  };
}

export interface LangProductInformation {
  color: {
    subTitle: string;
  };
  size: {
    subTitle: string;
  };
  addCart: string;
}

export interface LangReviews {
  title: string;
}

export interface LangYouMightAlsoLike {
  title: string;
}
