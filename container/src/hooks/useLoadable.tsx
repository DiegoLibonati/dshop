import { useEffect } from "react";

import { useLoadingContext } from "@container/hooks/useLoadingContext";

export const useLoadable = (active: boolean): void => {
  const { register } = useLoadingContext();

  useEffect(() => {
    if (!active) return undefined;

    return register();
  }, [active, register]);
};
