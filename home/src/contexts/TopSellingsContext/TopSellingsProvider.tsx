import { useState } from "react";

import type { JSX } from "react";
import type { TopSellingsProviderProps } from "@home/types/props";
import type { TopSellingsState } from "@home/types/states";
import type { Clothes } from "@shared-core/types";

import { TopSellingsContext } from "@home/contexts/TopSellingsContext/TopSellingsContext";

export const TopSellingsProvider = ({ children }: TopSellingsProviderProps): JSX.Element => {
  const [topSellingsState, setTopSellingsState] = useState<TopSellingsState>({
    clothes: null,
  });

  const handleSetTopSellings = (topSellings: Clothes[] | null): void => {
    setTopSellingsState((state) => ({ ...state, clothes: topSellings }));
  };

  return (
    <TopSellingsContext.Provider
      value={{
        topSellingsState: topSellingsState,
        handleSetTopSellings: handleSetTopSellings,
      }}
    >
      {children}
    </TopSellingsContext.Provider>
  );
};
