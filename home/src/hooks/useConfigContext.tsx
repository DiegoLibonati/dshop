import { useContext } from "react";

import { UseConfigContext } from "@src/entities/hooks";

import { ConfigContext } from "@src/contexts/ConfigContext";

export const useConfigContext = (): UseConfigContext => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfigContext must be used within ConfigProvider");
  }
  return context;
};
