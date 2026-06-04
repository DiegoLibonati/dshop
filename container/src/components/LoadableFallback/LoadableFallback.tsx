import { Fragment } from "react";

import type { JSX } from "react";
import type { LoadableFallbackProps } from "@container/types/props";

import { useLoadable } from "@container/hooks/useLoadable";

const LoadableFallback = ({ children }: LoadableFallbackProps): JSX.Element => {
  useLoadable(true);

  return <Fragment>{children}</Fragment>;
};

export default LoadableFallback;
