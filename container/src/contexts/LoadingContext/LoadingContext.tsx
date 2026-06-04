import { createContext } from "react";

import type { LoadingContext as LoadingContextT } from "@container/types/contexts";

export const LoadingContext = createContext<LoadingContextT | null>(null);
