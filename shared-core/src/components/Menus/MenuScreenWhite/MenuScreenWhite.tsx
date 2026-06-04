import type { JSX } from "react";
import type { MenuScreenWhiteProps } from "@shared-core/types/props";

import "@shared-core/components/Menus/MenuScreenWhite/MenuScreenWhite.css";

const MenuScreenWhite = ({ className, children }: MenuScreenWhiteProps): JSX.Element => {
  return <div className={`menu-screen-white ${className}`}>{children}</div>;
};

export default MenuScreenWhite;
