import { lazy } from "react";

import type { JSX } from "react";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

import { lang } from "@home/constants/lang";

import assets from "@home/assets";

import "@home/components/Sections/PresentationSection/PresentationSection.css";

const ButtonBlack = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.ButtonBlack })));
const SvgSkyStar = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.SvgSkyStar })));

const PresentationSection = (): JSX.Element => {
  const handleClickShopNow = (): void => {
    alert("Not configured.");
  };

  return (
    <section className="presentation">
      <article className="presentation-information">
        <h2 className="presentation-information__title">{lang.en.presentation.title}</h2>
        <p className="presentation-information__description">{lang.en.presentation.description}</p>
        <SharedMfe
          component={ButtonBlack}
          componentProps={{
            ariaLabel: "shop now",
            className: "presentation-information__shop-now",
            rounded: true,
            onClick: handleClickShopNow,
            children: lang.en.presentation.button_shop_now,
          }}
          wrapperClass="presentation-information__shop-now-wrapper"
          loadingClass="presentation-information__shop-now-loader"
        />

        <div className="presentation-information__counts">
          <div className="presentation-information__counts-single">
            <p className="presentation-information__counts-single-count">200+</p>
            <p className="presentation-information__counts-single-title">
              {lang.en.presentation.international_brands}
            </p>
          </div>

          <div className="presentation-information__counts-single">
            <p className="presentation-information__counts-single-count">2,000+</p>
            <p className="presentation-information__counts-single-title">
              {lang.en.presentation.high_quality_products}
            </p>
          </div>

          <div className="presentation-information__counts-single">
            <p className="presentation-information__counts-single-count">30,000+</p>
            <p className="presentation-information__counts-single-title">
              {lang.en.presentation.happy_customers}
            </p>
          </div>
        </div>
      </article>

      <article className="presentation-illustration presentation-illustration--mobile">
        <img
          src={assets.images.PresentationMobilePng}
          alt={"presentation-mobile-img"}
          className="presentation-illustration__img"
        ></img>

        <div className="presentation-illustration__vectors">
          <SharedMfe
            component={SvgSkyStar}
            componentProps={{
              width: 44,
              height: 44,
              className: "presentation-illustration__vector presentation-illustration__vector--1",
            }}
            wrapperClass="presentation-illustration__vector-wrapper"
            loadingClass="presentation-illustration__vector-loader"
          />
          <SharedMfe
            component={SvgSkyStar}
            componentProps={{
              width: 76,
              height: 76,
              className: "presentation-illustration__vector presentation-illustration__vector--2",
            }}
            wrapperClass="presentation-illustration__vector-wrapper"
            loadingClass="presentation-illustration__vector-loader"
          />
        </div>
      </article>

      <article className="presentation-illustration presentation-illustration--desktop">
        <img
          src={assets.images.PresentationDesktopPng}
          alt={"presentation-mobile-img"}
          className="presentation-illustration__img"
        ></img>

        <div className="presentation-illustration__vectors">
          <SharedMfe
            component={SvgSkyStar}
            componentProps={{
              width: 44,
              height: 44,
              className: "presentation-illustration__vector presentation-illustration__vector--1",
            }}
            wrapperClass="presentation-illustration__vector-wrapper"
            loadingClass="presentation-illustration__vector-loader"
          />
          <SharedMfe
            component={SvgSkyStar}
            componentProps={{
              width: 76,
              height: 76,
              className: "presentation-illustration__vector presentation-illustration__vector--2",
            }}
            wrapperClass="presentation-illustration__vector-wrapper"
            loadingClass="presentation-illustration__vector-loader"
          />
        </div>
      </article>
    </section>
  );
};

export default PresentationSection;
