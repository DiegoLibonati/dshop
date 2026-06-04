import { createContext } from "react";

import type { DressStylesContext as DressStylesContextT } from "@home/types/contexts";

export const DressStylesContext = createContext<DressStylesContextT | null>(null);
