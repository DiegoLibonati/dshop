import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "@container/App";

import "@container/index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
