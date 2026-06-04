import { lazy } from "react";

import type { JSX } from "react";
import type { HeaderOptionProps } from "@container/types/props";

import SharedMfe from "@container/components/SharedMfe/SharedMfe";

import "@container/components/Headers/HeaderOption/HeaderOption.css";

const SvgChevronDown = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.SvgChevronDown }))
);
const SvgChevronUp = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.SvgChevronUp }))
);

const HeaderOption = ({
  name,
  open,
  isMenu,
  className,
  onClick,
}: HeaderOptionProps): JSX.Element => {
  return (
    <button
      type="button"
      aria-label={`header ${name}`}
      className={`header-option ${className ?? ""}`}
      onClick={onClick}
    >
      <p className="header-option__text">{name}</p>

      {isMenu && !open && (
        <SharedMfe
          component={SvgChevronDown}
          componentProps={{ className: "header-option__icon" }}
          wrapperClass="header__option-icon-wrapper"
          loadingClass="header-option__icon-loader"
        />
      )}

      {isMenu && open && (
        <SharedMfe
          component={SvgChevronUp}
          componentProps={{ className: "header-option__icon" }}
          wrapperClass="header__option-icon-wrapper"
          loadingClass="header-option__icon-loader"
        />
      )}
    </button>
  );
};

export default HeaderOption;
