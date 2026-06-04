import { useState } from "react";

import type { JSX } from "react";
import type { NewArrivalsProviderProps } from "@home/types/props";
import type { NewArrivalsState } from "@home/types/states";
import type { Clothes } from "shared-core/sdk";

import { NewArrivalsContext } from "@home/contexts/NewArrivalsContext/NewArrivalsContext";

export const NewArrivalsProvider = ({ children }: NewArrivalsProviderProps): JSX.Element => {
  const [newArrivalsState, setNewArrivalsState] = useState<NewArrivalsState>({
    clothes: null,
  });

  const handleSetNewArrivals = (newArrivals: Clothes[] | null): void => {
    setNewArrivalsState((state) => ({ ...state, clothes: newArrivals }));
  };

  return (
    <NewArrivalsContext.Provider
      value={{
        newArrivalsState: newArrivalsState,
        handleSetNewArrivals: handleSetNewArrivals,
      }}
    >
      {children}
    </NewArrivalsContext.Provider>
  );
};
