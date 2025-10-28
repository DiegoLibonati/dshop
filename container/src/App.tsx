import React from "react";
import { HashRouter } from "react-router-dom";

import { AppRouter } from "@src/router/AppRouter";

export const App = () => {
  return (
    <HashRouter>
      <AppRouter></AppRouter>
    </HashRouter>
  );
};
