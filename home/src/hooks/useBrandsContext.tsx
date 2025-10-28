import { useContext } from "react";

import { UseBrandsContext } from "@src/entities/hooks";

import { BrandsContext } from "@src/contexts/BrandsContext";

export const useBrandsContext = (): UseBrandsContext => {
  const context = useContext(BrandsContext);
  if (!context) {
    throw new Error("useBrandsContext must be used within BrandsProvider");
  }
  return context;
};
