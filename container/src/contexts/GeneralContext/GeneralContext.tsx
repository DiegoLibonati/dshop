import { createContext } from "react";

import type { GeneralContext as GeneralContextT } from "@container/types/contexts";

export const GeneralContext = createContext<GeneralContextT | null>(null);
