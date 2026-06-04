import { useEffect } from "react";

import type { JSX } from "react";
import type { DressStyle } from "@home/types/app";

import IllustrationWithTitle from "@home/components/Illustrations/IllustrationWithTitle/IllustrationWithTitle";

import { useDressStylesContext } from "@home/hooks/useDressStylesContext";

import { lang } from "@home/constants/lang";

import "@home/components/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection.css";

const BrowseByDressStyleSection = (): JSX.Element => {
  const { dressStylesState, handleSetDressStyles } = useDressStylesContext();

  const handleClickStyle = (): void => {
    alert("Not configured.");
  };

  const onInit = (): void => {
    const styles: DressStyle[] = ["casual", "formal", "party", "gym"];

    handleSetDressStyles(styles);
  };

  useEffect(onInit, []);

  return (
    <div className="browse-by-dress-style-wrapper">
      <div className="browse-by-dress-style">
        <h2 className="browse-by-dress-style__title">{lang.en.browseByDressStyle.title}</h2>

        <div className="browse-by-dress-style__styles">
          {dressStylesState.styles?.map((ds) => (
            <IllustrationWithTitle key={`style-${ds}`} type={ds} onClick={handleClickStyle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByDressStyleSection;
