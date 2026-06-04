import type {
  SharedComponentModule,
  MfeScope,
  Color,
  Image,
  Size,
  Clothes,
  Locale,
  Product,
} from "shared-core/sdk";

export interface DefaultProps {
  language?: Locale;
}

export interface SharedMfeProps<P> {
  loader: () => Promise<SharedComponentModule<P>>;
  componentProps: P;
  wrapperClass?: string;
  loadingClass?: string;
  mfe?: MfeScope;
}

export interface ImageViewerArticleProps extends DefaultProps {
  images: Image[];
}

export interface ProductInformationArticleProps extends DefaultProps {
  name: string;
  rate: number;
  price: number;
  discount: number;
  description: string;
  colors: Color[];
  sizes: Size[];
}

export interface ProductDetailPageProps {
  product: Product;
  clothesAlsoLike: Clothes[];
}
