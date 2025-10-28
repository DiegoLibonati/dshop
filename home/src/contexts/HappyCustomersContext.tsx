import React, { createContext, useState } from "react";

import type { HappyCustomersContext as HappyCustomersContextT } from "@src/entities/contexts";
import { HappyCustomersProviderProps } from "@src/entities/props";

import { Review } from "shared_core/SharedCoreEntities";

export const HappyCustomersContext =
  createContext<HappyCustomersContextT | null>(null);

export const HappyCustomersProvider = ({
  children,
}: HappyCustomersProviderProps) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const handleSetReviews = (reviews: Review[] | null) => {
    setReviews(reviews);
  };

  return (
    <HappyCustomersContext.Provider
      value={{
        reviews: reviews,
        handleSetReviews: handleSetReviews,
      }}
    >
      {children}
    </HappyCustomersContext.Provider>
  );
};
