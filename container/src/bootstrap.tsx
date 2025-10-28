import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "@src/App";

import { GeneralProvider } from "@src/contexts/GeneralContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <GeneralProvider>
    <App></App>
  </GeneralProvider>
);
