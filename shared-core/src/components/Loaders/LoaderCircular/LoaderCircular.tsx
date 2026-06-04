import type { JSX } from "react";
import type { LoaderCircularProps } from "@shared-core/types/props";

import "@shared-core/components/Loaders/LoaderCircular/LoaderCircular.css";

const LoaderCircular = ({ className }: LoaderCircularProps): JSX.Element => {
  return <div className={`loader ${className}`}></div>;
};

export default LoaderCircular;
