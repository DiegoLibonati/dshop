import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@src/pages/HomePage/HomePage";
import ProductDetailPage from "@src/pages/ProductDetailPage/ProductDetailPage";

import { ContainerRoute } from "@src/router/ContainerRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ContainerRoute />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetailPage></ProductDetailPage>}
        ></Route>
      </Route>

      <Route
        path="/*"
        element={<Navigate to="/" replace={true}></Navigate>}
      ></Route>
    </Routes>
  );
};
