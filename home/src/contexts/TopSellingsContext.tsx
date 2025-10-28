import React, { createContext, useState } from "react";

import type { TopSellingsContext as TopSellingsContextT } from "@src/entities/contexts";
import { TopSellingsProviderProps } from "@src/entities/props";

import { Clothes } from "shared_core/SharedCoreEntities";

export const TopSellingsContext = createContext<TopSellingsContextT | null>(
  null
);

export const TopSellingsProvider = ({ children }: TopSellingsProviderProps) => {
  const [topSellings, setTopSellings] = useState<Clothes[] | null>(null);

  const handleSetTopSellings = (topSellings: Clothes[] | null) => {
    setTopSellings(topSellings);
  };

  return (
    <TopSellingsContext.Provider
      value={{
        topSellings: topSellings,
        handleSetTopSellings: handleSetTopSellings,
      }}
    >
      {children}
    </TopSellingsContext.Provider>
  );
};
