import React, { createContext, useState } from "react";

import type { NewArrivalsContext as NewArrivalsContextT } from "@src/entities/contexts";
import { NewArrivalsProviderProps } from "@src/entities/props";

import { Clothes } from "shared_core/SharedCoreEntities";

export const NewArrivalsContext = createContext<NewArrivalsContextT | null>(
  null
);

export const NewArrivalsProvider = ({ children }: NewArrivalsProviderProps) => {
  const [newArrivals, setNewArrivals] = useState<Clothes[] | null>(null);

  const handleSetNewArrivals = (newArrivals: Clothes[] | null) => {
    setNewArrivals(newArrivals);
  };

  return (
    <NewArrivalsContext.Provider
      value={{
        newArrivals: newArrivals,
        handleSetNewArrivals: handleSetNewArrivals,
      }}
    >
      {children}
    </NewArrivalsContext.Provider>
  );
};
