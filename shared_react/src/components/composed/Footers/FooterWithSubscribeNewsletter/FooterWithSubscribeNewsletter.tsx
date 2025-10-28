import React, { useRef } from "react";

import { FooterWithSubscribeNewsletterProps } from "@src/entities/props";

import { AnchorCircular } from "@src/components/core/Anchors/AnchorCircular/AnchorCircular";
import { SvgInstagram } from "@src/components/core/Svgs/SvgInstagram/SvgInstagram";
import { SvgFacebook } from "@src/components/core/Svgs/SvgFacebook/SvgFacebook";
import { SvgTwitter } from "@src/components/core/Svgs/SvgTwitter/SvgTwitter";
import { SubscribeNewsletter } from "@src/components/composed/Subscribes/SubscribeNewsletter/SubscribeNewsletter";

import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";

import assets from "@src/assets/export";

import "@src/components/composed/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter.css";

export const FooterWithSubscribeNewsletter = ({
  title,
  description,
  language = "en",
  className,
  facebook,
  instagram,
  twitter,
  children,
  html,
  onSubmitSubscribe,
}: FooterWithSubscribeNewsletterProps) => {
  const rootIds = useRef<string[]>(getIdsByLength(6));

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
          <h2 className="footer-with-subscribe-newsletter__content-title">
            {title}
          </h2>
          <p className="footer-with-subscribe-newsletter__content-description">
            {description}
          </p>

          {(instagram || facebook || twitter) && (
            <div className="footer-with-subscribe-newsletter__content-socials">
              {instagram && (
                <AnchorCircular
                  idRoot={rootIds.current[0]}
                  borderGray={true}
                  ariaLabel="social media instagram"
                  href={instagram}
                  target="_blank"
                  language={language}
                  className="footer-with-subscribe-newsletter__content-social"
                  classNameWrapper="footer-with-subscribe-newsletter__content-social-wrapper"
                >
                  <SvgInstagram
                    idRoot={rootIds.current[1]}
                    width={12}
                    height={12}
                    className="footer-with-subscribe-newsletter__content-social-icon"
                    classNameWrapper="footer-with-subscribe-newsletter__content-social-icon-wrapper"
                  ></SvgInstagram>
                </AnchorCircular>
              )}

              {facebook && (
                <AnchorCircular
                  idRoot={rootIds.current[2]}
                  borderGray={true}
                  ariaLabel="social media facebook"
                  href={facebook}
                  target="_blank"
                  language={language}
                  className="footer-with-subscribe-newsletter__content-social"
                  classNameWrapper="footer-with-subscribe-newsletter__content-social-wrapper"
                >
                  <SvgFacebook
                    idRoot={rootIds.current[3]}
                    width={12}
                    height={12}
                    className="footer-with-subscribe-newsletter__content-social-icon"
                    classNameWrapper="footer-with-subscribe-newsletter__content-social-icon-wrapper"
                  ></SvgFacebook>
                </AnchorCircular>
              )}

              {twitter && (
                <AnchorCircular
                  idRoot={rootIds.current[4]}
                  borderGray={true}
                  ariaLabel="social media twitter"
                  href={twitter}
                  target="_blank"
                  language={language}
                  className="footer-with-subscribe-newsletter__content-social"
                  classNameWrapper="footer-with-subscribe-newsletter__content-social-wrapper"
                >
                  <SvgTwitter
                    idRoot={rootIds.current[5]}
                    width={12}
                    height={12}
                    className="footer-with-subscribe-newsletter__content-social-icon"
                    classNameWrapper="footer-with-subscribe-newsletter__content-social-icon-wrapper"
                  ></SvgTwitter>
                </AnchorCircular>
              )}
            </div>
          )}
        </div>

        {html && (
          <div
            className="footer-with-subscribe-newsletter__content-links"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        )}

        {children && (
          <div className="footer-with-subscribe-newsletter__content-links">
            {children}
          </div>
        )}
      </div>

      <hr className="footer-with-subscribe-newsletter__separator"></hr>

      <div className="footer-with-subscribe-newsletter__end">
        <p className="footer-with-subscribe-newsletter__end-cr">
          {title} © All Rights Reserved
        </p>

        <img
          src={assets.images.PaymentsPng}
          alt={"payments"}
          className="footer-with-subscribe-newsletter__end-payments"
        ></img>
      </div>
    </footer>
  );
};
