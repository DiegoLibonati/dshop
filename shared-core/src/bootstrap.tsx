import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "@shared-core/App";

import "@shared-core/styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
