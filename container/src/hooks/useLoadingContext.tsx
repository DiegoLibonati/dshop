import { useContext } from "react";

import type { UseLoadingContext } from "@container/types/hooks";

import { LoadingContext } from "@container/contexts/LoadingContext/LoadingContext";

export const useLoadingContext = (): UseLoadingContext => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoadingContext must be used within LoadingProvider");
  return context;
};
