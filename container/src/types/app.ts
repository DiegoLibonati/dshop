export interface HeaderOption {
  id: HeaderOptionId;
  name: string;
  isMenu?: boolean;
  open?: boolean;
}
export type HeaderOptionId = "shop" | "onSale" | "newArrivals" | "brands";

export interface FooterSection {
  id: FooterSectionId;
  title: string;
  content: FooterContent[];
}
export type FooterSectionId = "company" | "help" | "faq" | "resources";
export interface FooterContent {
  title: string;
  link: string;
}

export interface ProductAPI {
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
}
