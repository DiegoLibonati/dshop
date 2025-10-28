import React, { useEffect } from "react";

import { DressStyle } from "@src/entities/app";

import { IllustrationWithTitle } from "@src/components/composed/Illustrations/IllustrationWithTitle/IllustrationWithTitle";

import { useDressStylesContext } from "@src/hooks/useDressStylesContext";

import { lang } from "@src/constants/lang";

import "@src/components/composed/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection.css";

export const BrowseByDressStyleSection = () => {
  const { dressStyles, handleSetDressStyles } = useDressStylesContext();

  const handleClickStyle = (type: DressStyle) => {
    alert("Not configured.");
  };

  const onInit = () => {
    const styles: DressStyle[] = ["casual", "formal", "party", "gym"];

    handleSetDressStyles(styles);
  };

  useEffect(onInit, []);

  return (
    <div className="browse-by-dress-style-wrapper">
      <div className="browse-by-dress-style">
        <h2 className="browse-by-dress-style__title">
          {lang["en"].browseByDressStyle.title}
        </h2>

        <div className="browse-by-dress-style__styles">
          {dressStyles &&
            dressStyles.map((ds) => {
              return (
                <IllustrationWithTitle
                  key={`style-${ds}`}
                  type={ds}
                  onClick={() => handleClickStyle(ds)}
                ></IllustrationWithTitle>
              );
            })}
        </div>
      </div>
    </div>
  );
};
