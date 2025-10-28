import React from "react";

import { FooterContent } from "@src/entities/app";

import { Locale } from "shared_core/SharedCoreEntities";

interface DefaultProps {
  children?: React.ReactNode;
  language?: Locale;
  className?: string;
  classNameWrapper?: string;
  html?: string;
}

export interface AppHomeProps extends DefaultProps {}

export interface AppProductDetailProps extends DefaultProps {}

export interface LayoutPageProps extends DefaultProps {}

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

export interface GeneralProviderProps extends DefaultProps {}
