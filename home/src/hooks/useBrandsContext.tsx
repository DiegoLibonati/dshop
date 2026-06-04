import { useContext } from "react";

import type { UseBrandsContext } from "@home/types/hooks";

import { BrandsContext } from "@home/contexts/BrandsContext/BrandsContext";

export const useBrandsContext = (): UseBrandsContext => {
  const context = useContext(BrandsContext);
  if (!context) throw new Error("useBrandsContext must be used within BrandsProvider");
  return context;
};
