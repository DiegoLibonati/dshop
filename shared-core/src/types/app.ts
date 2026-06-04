export type Locale = "en";

export interface Image {
  id: string;
  src: string;
  alt: string;
}

export interface Color {
  id: string;
  color: string;
}

export interface Size {
  id: string;
  size: "Small" | "Medium" | "Large" | "X-Large";
}

export interface Review {
  id: string;
  name: string;
  description: string;
  value: number;
}

export interface Clothes {
  id: string;
  src: string;
  name: string;
  rate: number;
  price: number;
  discount: number;
  description?: string;
}

export interface Product extends Pick<
  Clothes,
  "name" | "rate" | "price" | "discount" | "description"
> {
  id: string;
  images: Image[];
  colors: Color[];
  sizes: Size[];
  reviews: Review[];
}
