import { Params } from "react-router-dom";

import { GeneralContext } from "@src/entities/contexts";

export type UseRouter = {
  params: Readonly<Params<string>>;
  navigateToHome: () => void;
  navigateToProductDetail: (id: string) => void;
};

export type UseGeneralContext = GeneralContext;
