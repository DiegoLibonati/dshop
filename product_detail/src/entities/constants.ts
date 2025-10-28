export type LangC = {
  en: {
    productInformation: LangProductInformation;
    reviews: LangReviews;
    youMightAlsoLike: LangYouMightAlsoLike;
  };
};

export type LangProductInformation = {
  color: {
    subTitle: string;
  };
  size: {
    subTitle: string;
  };
  addCart: string;
};

export type LangReviews = {
  title: string;
};

export type LangYouMightAlsoLike = {
  title: string;
};
