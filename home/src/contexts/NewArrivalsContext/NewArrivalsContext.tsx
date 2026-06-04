import { createContext } from "react";

import type { NewArrivalsContext as NewArrivalsContextT } from "@home/types/contexts";

export const NewArrivalsContext = createContext<NewArrivalsContextT | null>(null);
