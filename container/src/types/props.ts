import type { FooterContent } from "@container/types/app";
import type {
  Locale,
  MfeCallbacks,
  MfeModule,
  MfeScope,
  SharedComponentModule,
} from "shared-core/sdk";

export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
  language?: Locale;
}

interface DefaultSharedMfeProps {
  wrapperClass?: string;
  loadingClass?: string;
}

export interface RemoteMfeProps {
  loadModule: () => Promise<MfeModule | { default: MfeModule }>;
  callbacks: MfeCallbacks;
  mountData?: Record<string, unknown>;
  wrapperClass?: string;
}

export interface RemoteMountProps {
  mod: MfeModule;
  callbacks: MfeCallbacks;
  mountData: Record<string, unknown> | undefined;
  wrapperClass: string | undefined;
}

export type SharedMfeProps<P> = DefaultSharedMfeProps &
  (
    | { component: React.ComponentType<P>; componentProps: P; mfe?: MfeScope }
    | { loader: () => Promise<SharedComponentModule<P>>; componentProps: P }
  );

export interface HomeAppProps {
  callbacks: MfeCallbacks;
}

export interface ProductDetailAppProps {
  callbacks: MfeCallbacks;
}

export type LayoutPrincipalProps = DefaultProps;

export interface HeaderOptionProps extends DefaultProps {
  name: string;
  open: boolean;
  isMenu: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FooterSectionProps extends DefaultProps {
  title: string;
  content: FooterContent[];
}

export interface MenuHeaderProps extends DefaultProps {
  isMenuOpen: boolean;
  handleClickMenuClose: () => void;
}

export interface GeneralProviderProps {
  children: React.ReactNode;
}

export interface LoadingProviderProps {
  children: React.ReactNode;
}

export interface LoadableFallbackProps {
  children?: React.ReactNode;
}

export interface SharedMfeMountProps<P> {
  loader: () => Promise<SharedComponentModule<P>>;
  componentProps: P;
  wrapperClass?: string | undefined;
  loadingClass?: string | undefined;
}
