import { useContext } from "react";

import type { UseNewArrivalsContext } from "@home/types/hooks";

import { NewArrivalsContext } from "@home/contexts/NewArrivalsContext/NewArrivalsContext";

export const useNewArrivalsContext = (): UseNewArrivalsContext => {
  const context = useContext(NewArrivalsContext);
  if (!context) throw new Error("useNewArrivalsContext must be used within NewArrivalsProvider");
  return context;
};
