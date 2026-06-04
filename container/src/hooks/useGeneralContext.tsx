import { useContext } from "react";

import type { UseGeneralContext } from "@container/types/hooks";

import { GeneralContext } from "@container/contexts/GeneralContext/GeneralContext";

export const useGeneralContext = (): UseGeneralContext => {
  const context = useContext(GeneralContext);
  if (!context) throw new Error("useGeneralContext must be used within GeneralProvider");
  return context;
};
