import React, { createContext, useState } from "react";

import { Callbacks } from "@src/entities/app";
import type { ConfigContext as ConfigContextT } from "@src/entities/contexts";
import { ConfigProviderProps } from "@src/entities/props";

export const ConfigContext = createContext<ConfigContextT | null>(null);

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [callbacks, setCallbacks] = useState<Callbacks | null>(null);

  const handleSetInitialConfig = ({ callbacks }: { callbacks: Callbacks }) => {
    setCallbacks(callbacks);
  };

  return (
    <ConfigContext.Provider
      value={{
        callbacks: callbacks,
        handleSetInitialConfig: handleSetInitialConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
