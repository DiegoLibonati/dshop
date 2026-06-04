import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

import type { UseMfeCallbacks } from "@container/types/hooks";

export const useMfeCallbacks = (): UseMfeCallbacks => {
  const navigate = useNavigate();

  const onNavigate = useCallback(
    (path: string): void => {
      void navigate(path);
    },
    [navigate]
  );

  return useMemo(
    (): UseMfeCallbacks => ({
      onNavigate,
    }),
    [onNavigate]
  );
};
