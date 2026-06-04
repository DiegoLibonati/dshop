import { useState } from "react";

import type { JSX } from "react";
import type { HappyCustomersProviderProps } from "@home/types/props";
import type { HappyCustomersState } from "@home/types/states";
import type { Review } from "shared-core/sdk";

import { HappyCustomersContext } from "@home/contexts/HappyCustomersContext/HappyCustomersContext";

export const HappyCustomersProvider = ({ children }: HappyCustomersProviderProps): JSX.Element => {
  const [happyCustomersState, setHappyCustomersState] = useState<HappyCustomersState>({
    reviews: null,
  });

  const handleSetReviews = (reviews: Review[] | null): void => {
    setHappyCustomersState((state) => ({ ...state, reviews: reviews }));
  };

  return (
    <HappyCustomersContext.Provider
      value={{
        happyCustomersState: happyCustomersState,
        handleSetReviews: handleSetReviews,
      }}
    >
      {children}
    </HappyCustomersContext.Provider>
  );
};
