import React, { createContext, useState } from "react";

import type { BrandsContext as BrandsContextT } from "@src/entities/contexts";
import { BrandsProviderProps } from "@src/entities/props";

export const BrandsContext = createContext<BrandsContextT | null>(null);

export const BrandsProvider = ({ children }: BrandsProviderProps) => {
  const [brands, setBrands] = useState<string[] | null>(null);

  const handleSetBrands = (brands: string[] | null) => {
    setBrands(brands);
  };

  return (
    <BrandsContext.Provider
      value={{
        brands: brands,
        handleSetBrands: handleSetBrands,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
};
