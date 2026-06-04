import { lazy } from "react";

import type { JSX } from "react";
import type { FooterWithSubscribeNewsletterProps } from "@shared-react/types/props";

import SharedMfe from "@shared-react/components/SharedMfe/SharedMfe";
import SubscribeNewsletter from "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter";

import { lang } from "@shared-react/constants/lang";

import assets from "@shared-react/assets/index";

import "@shared-react/components/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter.css";

const AnchorCircular = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.AnchorCircular }))
);
const SvgInstagram = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.SvgInstagram }))
);
const SvgFacebook = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.SvgFacebook })));
const SvgTwitter = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.SvgTwitter })));

const FooterWithSubscribeNewsletter = ({
  title,
  description,
  language = "en",
  className,
  facebook,
  instagram,
  twitter,
  children,
  onSubmitSubscribe,
}: FooterWithSubscribeNewsletterProps): JSX.Element => {
  return (
    <footer className={`footer-with-subscribe-newsletter ${className}`}>
      <SubscribeNewsletter
        language={language}
        title={lang[language].subscribeNewsletter.title}
        submitLabel={lang[language].subscribeNewsletter.btnSubscribeNewsletter}
        onSubmit={onSubmitSubscribe}
        className="footer-with-subscribe-newsletter__subscribe"
      ></SubscribeNewsletter>

      <div className="footer-with-subscribe-newsletter__content">
        <div className="footer-with-subscribe-newsletter__content-header">
          <h2 className="footer-with-subscribe-newsletter__content-title">{title}</h2>
          <p className="footer-with-subscribe-newsletter__content-description">{description}</p>

          {(instagram ?? facebook ?? twitter) && (
            <div className="footer-with-subscribe-newsletter__content-socials">
              {instagram && (
                <SharedMfe
                  component={AnchorCircular}
                  componentProps={{
                    ariaLabel: "social media instagram",
                    href: instagram,
                    target: "_blank",
                    borderGray: true,
                    language,
                    className: "footer-with-subscribe-newsletter__content-social",
                    children: (
                      <SharedMfe
                        component={SvgInstagram}
                        componentProps={{
                          width: 12,
                          height: 12,
                          className: "footer-with-subscribe-newsletter__content-social-icon",
                        }}
                        loadingClass="footer-with-subscribe-newsletter__content-social-icon-loader"
                      />
                    ),
                  }}
                  loadingClass="footer-with-subscribe-newsletter__content-social-loader"
                />
              )}

              {facebook && (
                <SharedMfe
                  component={AnchorCircular}
                  componentProps={{
                    ariaLabel: "social media facebook",
                    href: facebook,
                    target: "_blank",
                    borderGray: true,
                    language,
                    className: "footer-with-subscribe-newsletter__content-social",
                    children: (
                      <SharedMfe
                        component={SvgFacebook}
                        componentProps={{
                          width: 12,
                          height: 12,
                          className: "footer-with-subscribe-newsletter__content-social-icon",
                        }}
                        loadingClass="footer-with-subscribe-newsletter__content-social-icon-loader"
                      />
                    ),
                  }}
                  loadingClass="footer-with-subscribe-newsletter__content-social-loader"
                />
              )}

              {twitter && (
                <SharedMfe
                  component={AnchorCircular}
                  componentProps={{
                    ariaLabel: "social media twitter",
                    href: twitter,
                    target: "_blank",
                    borderGray: true,
                    language,
                    className: "footer-with-subscribe-newsletter__content-social",
                    children: (
                      <SharedMfe
                        component={SvgTwitter}
                        componentProps={{
                          width: 12,
                          height: 12,
                          className: "footer-with-subscribe-newsletter__content-social-icon",
                        }}
                        loadingClass="footer-with-subscribe-newsletter__content-social-icon-loader"
                      />
                    ),
                  }}
                  loadingClass="footer-with-subscribe-newsletter__content-social-loader"
                />
              )}
            </div>
          )}
        </div>

        {children && (
          <div className="footer-with-subscribe-newsletter__content-links">{children}</div>
        )}
      </div>

      <hr className="footer-with-subscribe-newsletter__separator"></hr>

      <div className="footer-with-subscribe-newsletter__end">
        <p className="footer-with-subscribe-newsletter__end-cr">{title} © All Rights Reserved</p>

        <img
          src={assets.images.PaymentsPng}
          alt={"payments"}
          className="footer-with-subscribe-newsletter__end-payments"
        ></img>
      </div>
    </footer>
  );
};

export default FooterWithSubscribeNewsletter;
