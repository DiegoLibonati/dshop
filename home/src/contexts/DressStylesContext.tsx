import React, { createContext, useContext, useState } from "react";

import type { DressStylesContext as DressStylesContextT } from "@src/entities/contexts";
import { DressStylesProviderProps } from "@src/entities/props";

export const DressStylesContext = createContext<DressStylesContextT | null>(
  null
);

export const DressStylesProvider = ({ children }: DressStylesProviderProps) => {
  const [dressStyles, setDressStyles] = useState<string[] | null>(null);

  const handleSetDressStyles = (dressStyles: string[] | null) => {
    setDressStyles(dressStyles);
  };

  return (
    <DressStylesContext.Provider
      value={{
        dressStyles: dressStyles,
        handleSetDressStyles: handleSetDressStyles,
      }}
    >
      {children}
    </DressStylesContext.Provider>
  );
};
