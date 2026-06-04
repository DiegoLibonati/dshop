import type { JSX } from "react";
import type { InheritedProviderProps } from "@shared-core/types/props";

import { InheritedContext } from "@shared-core/contexts/InheritedContext/InheritedContext";

export const InheritedProvider = ({ children, callbacks }: InheritedProviderProps): JSX.Element => {
  return (
    <InheritedContext.Provider value={{ callbacks: callbacks }}>
      {children}
    </InheritedContext.Provider>
  );
};
