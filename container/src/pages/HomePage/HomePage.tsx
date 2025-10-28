import React, { lazy } from "react";

import LayoutPrincipal from "@src/layouts/LayoutPrincipal/LayoutPrincipal";

import "@src/pages/HomePage/HomePage.css";

const HomeLazy = lazy(() => import("@src/components/apps/AppHome/AppHome"));

const HomePage = () => {
  return (
    <LayoutPrincipal>
      <HomeLazy classNameWrapper="home-wrapper"></HomeLazy>
    </LayoutPrincipal>
  );
};

export default HomePage;
