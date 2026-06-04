import { useContext } from "react";

import type { UseHappyCustomersContext } from "@home/types/hooks";

import { HappyCustomersContext } from "@home/contexts/HappyCustomersContext/HappyCustomersContext";

export const useHappyCustomersContext = (): UseHappyCustomersContext => {
  const context = useContext(HappyCustomersContext);
  if (!context)
    throw new Error("useHappyCustomersContext must be used within HappyCustomersProvider");
  return context;
};
