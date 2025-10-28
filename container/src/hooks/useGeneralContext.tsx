import { useContext } from "react";

import { UseGeneralContext } from "@src/entities/hooks";

import { GeneralContext } from "@src/contexts/GeneralContext";

export const useGeneralContext = (): UseGeneralContext => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within GeneralProvider");
  }
  return context;
};
