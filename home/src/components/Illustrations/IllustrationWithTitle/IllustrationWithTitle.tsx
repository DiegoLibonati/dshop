import type { JSX } from "react";
import type { IllustrationWithTitleProps } from "@home/types/props";

import assets from "@home/assets";

import "@home/components/Illustrations/IllustrationWithTitle/IllustrationWithTitle.css";

const IllustrationWithTitle = ({
  type,
  className,
  onClick,
}: IllustrationWithTitleProps): JSX.Element => {
  return (
    <button
      className={`illustration-with-title ${className}`}
      aria-label={`illustration ${type}`}
      onClick={onClick}
    >
      <h2 className="illustration-with-title__title">{type}</h2>

      {type === "casual" && (
        <img
          src={assets.images.CasualPng}
          alt={`${type} img`}
          className="illustration-with-title__illustration illustration-with-title__illustration-casual"
        ></img>
      )}

      {type === "formal" && (
        <img
          src={assets.images.FormalPng}
          alt={`${type} img`}
          className="illustration-with-title__illustration illustration-with-title__illustration-formal"
        ></img>
      )}

      {type === "gym" && (
        <img
          src={assets.images.GymPng}
          alt={`${type} img`}
          className="illustration-with-title__illustration illustration-with-title__illustration-gym"
        ></img>
      )}

      {type === "party" && (
        <img
          src={assets.images.PartyPng}
          alt={`${type} img`}
          className="illustration-with-title__illustration illustration-with-title__illustration-party"
        ></img>
      )}
    </button>
  );
};

export default IllustrationWithTitle;
