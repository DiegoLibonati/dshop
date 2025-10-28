import { useContext } from "react";

import { UseTopSellingsContext } from "@src/entities/hooks";

import { TopSellingsContext } from "@src/contexts/TopSellingsContext";

export const useTopSellingsContext = (): UseTopSellingsContext => {
  const context = useContext(TopSellingsContext);
  if (!context) {
    throw new Error(
      "useTopSellingsContext must be used within TopSellingsProvider"
    );
  }
  return context;
};
