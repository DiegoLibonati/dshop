import { Component } from "@src/entities/enum";

export type Locale = "en";

export type MountOptions = {
  idComponent: Component;
  props?: Record<string, unknown>;
  debug?: Debug;
};

export type UnMountOptions = {
  debug?: Debug;
};

export type Debug = boolean;

export type Image = {
  id: string;
  src: string;
  alt: string;
};

export type Color = {
  id: string;
  color: string;
};

export type Size = {
  id: string;
  size: "Small" | "Medium" | "Large" | "X-Large";
};

export type Review = {
  id: string;
  name: string;
  description: string;
  value: number;
};

export type Clothes = {
  id: string;
  src: string;
  name: string;
  rate: number;
  price: number;
  discount: number;
  description?: string;
};

export type Product = {
  id: string;
  images: Image[];
  colors: Color[];
  sizes: Size[];
  reviews: Review[];
} & Pick<Clothes, "name" | "rate" | "price" | "discount" | "description">;
