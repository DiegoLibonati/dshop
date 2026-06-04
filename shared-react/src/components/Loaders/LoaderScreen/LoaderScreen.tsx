import { LoaderCircular } from "shared-core/sdk";

import type { JSX } from "react";
import type { LoaderScreenProps } from "@shared-react/types/props";

import "@shared-react/components/Loaders/LoaderScreen/LoaderScreen.css";

const LoaderScreen = ({ className }: LoaderScreenProps): JSX.Element => {
  return (
    <div className={`loader-screen ${className ?? ""}`}>
      <div data-mfe="shared-core">
        <LoaderCircular />
      </div>
    </div>
  );
};

export default LoaderScreen;
