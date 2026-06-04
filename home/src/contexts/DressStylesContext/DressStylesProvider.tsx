import { useState } from "react";

import type { JSX } from "react";
import type { DressStylesProviderProps } from "@home/types/props";
import type { DressStylesState } from "@home/types/states";
import type { DressStyle } from "@home/types/app";

import { DressStylesContext } from "@home/contexts/DressStylesContext/DressStylesContext";

export const DressStylesProvider = ({ children }: DressStylesProviderProps): JSX.Element => {
  const [dressStylesState, setDressStylesState] = useState<DressStylesState>({
    styles: null,
  });

  const handleSetDressStyles = (dressStyles: DressStyle[] | null): void => {
    setDressStylesState((state) => ({ ...state, styles: dressStyles }));
  };

  return (
    <DressStylesContext.Provider
      value={{
        dressStylesState: dressStylesState,
        handleSetDressStyles: handleSetDressStyles,
      }}
    >
      {children}
    </DressStylesContext.Provider>
  );
};
