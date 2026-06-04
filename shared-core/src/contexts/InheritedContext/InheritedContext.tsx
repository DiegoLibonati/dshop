import { createContext } from "react";

import type { InheritedContext as InheritedContextT } from "@shared-core/types/contexts";

export const InheritedContext = createContext<InheritedContextT | null>(null);
