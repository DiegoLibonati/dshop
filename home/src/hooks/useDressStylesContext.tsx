import { useContext } from "react";

import { UseDressStylesContext } from "@src/entities/hooks";

import { DressStylesContext } from "@src/contexts/DressStylesContext";

export const useDressStylesContext = (): UseDressStylesContext => {
  const context = useContext(DressStylesContext);
  if (!context) {
    throw new Error(
      "useDressStylesContext must be used within DressStylesProvider"
    );
  }
  return context;
};
