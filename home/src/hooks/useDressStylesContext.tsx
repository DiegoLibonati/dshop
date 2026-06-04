import { useContext } from "react";

import type { UseDressStylesContext } from "@home/types/hooks";

import { DressStylesContext } from "@home/contexts/DressStylesContext/DressStylesContext";

export const useDressStylesContext = (): UseDressStylesContext => {
  const context = useContext(DressStylesContext);
  if (!context) throw new Error("useDressStylesContext must be used within DressStylesProvider");
  return context;
};
