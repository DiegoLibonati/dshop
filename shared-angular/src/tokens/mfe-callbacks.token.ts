import { InjectionToken } from "@angular/core";

import type { MfeCallbacks } from "shared-core/sdk";

export const MFE_CALLBACKS = new InjectionToken<MfeCallbacks>("MfeCallbacks");
