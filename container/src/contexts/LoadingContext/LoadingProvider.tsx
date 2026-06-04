import { useCallback, useEffect, useMemo, useState } from "react";
import { LoaderScreen } from "shared-react/sdk";

import type { JSX } from "react";
import type { LoadingContext as LoadingContextT } from "@container/types/contexts";
import type { LoadingProviderProps } from "@container/types/props";
import type { LoadingState } from "@container/types/states";

import { LoadingContext } from "@container/contexts/LoadingContext/LoadingContext";

const MAX_LOADING_MS = 15000;

export const LoadingProvider = ({ children }: LoadingProviderProps): JSX.Element => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    pending: 0,
    booted: false,
    timedOut: false,
  });

  const register = useCallback((): (() => void) => {
    setLoadingState((state) => ({ ...state, pending: state.pending + 1 }));

    let released = false;

    return (): void => {
      if (released) return;
      released = true;
      setLoadingState((state) => ({ ...state, pending: state.pending - 1 }));
    };
  }, []);

  useEffect(() => {
    setLoadingState((state) => ({ ...state, booted: true }));
  }, []);

  const { pending, booted, timedOut } = loadingState;

  const isActive = !booted || pending > 0;

  useEffect(() => {
    if (!isActive) return undefined;

    setLoadingState((state) => (state.timedOut ? { ...state, timedOut: false } : state));

    const timeout = window.setTimeout(() => {
      setLoadingState((state) => ({ ...state, timedOut: true }));
    }, MAX_LOADING_MS);

    return (): void => {
      window.clearTimeout(timeout);
    };
  }, [isActive]);

  const value = useMemo((): LoadingContextT => ({ register }), [register]);

  const isLoading = !timedOut && isActive;

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div data-mfe="shared-react">
          <LoaderScreen className="container-loader-screen" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
