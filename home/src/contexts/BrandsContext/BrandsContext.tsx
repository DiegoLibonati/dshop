import { createContext } from "react";

import type { BrandsContext as BrandsContextT } from "@home/types/contexts";

export const BrandsContext = createContext<BrandsContextT | null>(null);
