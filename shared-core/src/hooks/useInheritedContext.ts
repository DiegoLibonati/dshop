import { useContext } from "react";

import type { InheritedContext as InheritedContextT } from "@shared-core/types/contexts";

import { InheritedContext } from "@shared-core/contexts/InheritedContext/InheritedContext";

export const useInheritedContext = (): InheritedContextT | null => {
  return useContext(InheritedContext);
};
