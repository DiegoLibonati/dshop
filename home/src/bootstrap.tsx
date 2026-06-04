import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "@home/App";

import { clothesList } from "@home/constants/clothes";
import { reviews } from "@home/constants/reviews";

import "@home/index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App
      brands={["special", "gym"]}
      newArrivals={clothesList}
      reviews={reviews}
      topSellings={clothesList}
    />
  </StrictMode>
);
