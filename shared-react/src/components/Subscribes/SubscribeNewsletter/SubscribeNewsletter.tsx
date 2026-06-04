import { lazy, useState } from "react";

import type { JSX } from "react";
import type { SubscribeNewsletterProps } from "@shared-react/types/props";

import SharedMfe from "@shared-react/components/SharedMfe/SharedMfe";

import { lang } from "@shared-react/constants/lang";

import "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter.css";

const ButtonWhite = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.ButtonWhite })));

const SubscribeNewsletter = ({
  title,
  submitLabel,
  language = "en",
  className,
  onSubmit,
}: SubscribeNewsletterProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleNativeSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  return (
    <div className={`subscribe-newsletter ${className}`}>
      <h2 className="subscribe-newsletter__title">{title}</h2>

      <form className="subscribe-newsletter__form" onSubmit={handleNativeSubmit}>
        <input
          id="input-subscribe-newsletter"
          name="input-subscribe-newsletter"
          type="text"
          className="subscribe-newsletter__form-input"
          placeholder={lang[language].subscribeNewsletter.placeholder}
          onChange={onInputChange}
          value={inputValue}
        ></input>
        <SharedMfe
          component={ButtonWhite}
          componentProps={{
            ariaLabel: "submit button subscribe newsletter",
            type: "submit",
            borderGray: false,
            rounded: true,
            language,
            className: "subscribe-newsletter__form-submit",
            children: submitLabel,
          }}
          loadingClass="subscribe-newsletter__form-submit-loader"
        />
      </form>
    </div>
  );
};

export default SubscribeNewsletter;
