export type HeaderOption = {
  id: HeaderOptionId;
  name: string;
  isMenu?: boolean;
  open?: boolean;
};
export type HeaderOptionId = "shop" | "onSale" | "newArrivals" | "brands";

export type FooterSection = {
  id: FooterSectionId;
  title: string;
  content: FooterContent[];
};
export type FooterSectionId = "company" | "help" | "faq" | "resources";
export type FooterContent = {
  title: string;
  link: string;
};

export type ProductAPI = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
};
