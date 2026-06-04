import { createContext } from "react";

import type { HappyCustomersContext as HappyCustomersContextT } from "@home/types/contexts";

export const HappyCustomersContext = createContext<HappyCustomersContextT | null>(null);
