import { useContext } from "react";

import { UseHappyCustomersContext } from "@src/entities/hooks";

import { HappyCustomersContext } from "@src/contexts/HappyCustomersContext";

export const useHappyCustomersContext = (): UseHappyCustomersContext => {
  const context = useContext(HappyCustomersContext);
  if (!context) {
    throw new Error(
      "useHappyCustomersContext must be used within HappyCustomersProvider"
    );
  }
  return context;
};
