import { useState } from "react";

import type { JSX } from "react";
import type { BrandsState } from "@home/types/states";
import type { BrandsProviderProps } from "@home/types/props";
import type { Brand } from "@home/types/app";

import { BrandsContext } from "@home/contexts/BrandsContext/BrandsContext";

export const BrandsProvider = ({ children }: BrandsProviderProps): JSX.Element => {
  const [brandsState, setBrandsState] = useState<BrandsState>({
    brands: null,
  });

  const handleSetBrands = (brands: Brand[] | null): void => {
    setBrandsState((state) => ({ ...state, brands: brands }));
  };

  return (
    <BrandsContext.Provider
      value={{
        brandsState: brandsState,
        handleSetBrands: handleSetBrands,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
};
