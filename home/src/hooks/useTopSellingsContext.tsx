import { useContext } from "react";

import type { UseTopSellingsContext } from "@home/types/hooks";

import { TopSellingsContext } from "@home/contexts/TopSellingsContext/TopSellingsContext";

export const useTopSellingsContext = (): UseTopSellingsContext => {
  const context = useContext(TopSellingsContext);
  if (!context) throw new Error("useTopSellingsContext must be used within TopSellingsProvider");
  return context;
};
