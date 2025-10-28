import { useContext } from "react";

import { UseNewArrivalsContext } from "@src/entities/hooks";

import { NewArrivalsContext } from "@src/contexts/NewArrivalsContext";

export const useNewArrivalsContext = (): UseNewArrivalsContext => {
  const context = useContext(NewArrivalsContext);
  if (!context) {
    throw new Error(
      "useNewArrivalsContext must be used within NewArrivalsProvider"
    );
  }
  return context;
};
