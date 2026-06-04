import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "@shared-react/App";

import "@shared-react/index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
