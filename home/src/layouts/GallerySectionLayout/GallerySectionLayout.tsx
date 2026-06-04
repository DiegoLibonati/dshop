import { lazy } from "react";

import type { JSX } from "react";
import type { GallerySectionLayoutProps } from "@home/types/props";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

import "@home/layouts/GallerySectionLayout/GallerySectionLayout.css";

const ButtonWhite = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.ButtonWhite })));

const GallerySectionLayout = ({
  btnText,
  children,
  className,
  onClick,
}: GallerySectionLayoutProps): JSX.Element => {
  return (
    <section className={`gallery-section ${className}`}>
      {children}

      <SharedMfe
        component={ButtonWhite}
        componentProps={{
          ariaLabel: `${btnText}-gallery-button`,
          borderGray: true,
          rounded: true,
          type: "button",
          onClick,
          className: "gallery-section__btn",
          children: btnText,
        }}
        wrapperClass="gallery-section__btn-wrapper"
        loadingClass="gallery-section__btn-loader"
      />
    </section>
  );
};

export default GallerySectionLayout;
