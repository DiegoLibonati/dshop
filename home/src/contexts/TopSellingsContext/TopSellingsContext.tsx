import { createContext } from "react";

import type { TopSellingsContext as TopSellingsContextT } from "@home/types/contexts";

export const TopSellingsContext = createContext<TopSellingsContextT | null>(null);
