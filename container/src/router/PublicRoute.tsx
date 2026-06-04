import { Outlet } from "react-router";

import type { JSX } from "react";

import LayoutPrincipal from "@container/layouts/LayoutPrincipal/LayoutPrincipal";

export const PublicRoute = (): JSX.Element => {
  return (
    <LayoutPrincipal>
      <Outlet />
    </LayoutPrincipal>
  );
};
