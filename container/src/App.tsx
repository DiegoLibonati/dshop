import { BrowserRouter } from "react-router";

import type { JSX } from "react";

import { ContainerRouter } from "@container/router/ContainerRouter";

import { GeneralProvider } from "@container/contexts/GeneralContext/GeneralProvider";
import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

function App(): JSX.Element {
  return (
    <GeneralProvider>
      <LoadingProvider>
        <BrowserRouter>
          <ContainerRouter></ContainerRouter>
        </BrowserRouter>
      </LoadingProvider>
    </GeneralProvider>
  );
}

export default App;
