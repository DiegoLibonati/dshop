import React, { useEffect } from "react";

import { AppProps } from "@src/entities/props";

import { PresentationSection } from "@src/components/composed/Sections/PresentationSection/PresentationSection";
import { BrandsSection } from "@src/components/composed/Sections/BrandsSection/BrandsSection";
import { NewArrivalsSection } from "@src/components/composed/Sections/NewArrivalsSection/NewArrivalsSection";
import { TopSellingSection } from "@src/components/composed/Sections/TopSellingSection/TopSellingSection";
import { BrowseByDressStyleSection } from "@src/components/composed/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection";
import { OurHappyCustomersSection } from "@src/components/composed/Sections/OurHappyCustomersSection/OurHappyCustomersSection";

import { useConfigContext } from "@src/hooks/useConfigContext";
import { useBrandsContext } from "@src/hooks/useBrandsContext";
import { useNewArrivalsContext } from "@src/hooks/useNewArrivalsContext";
import { useTopSellingsContext } from "@src/hooks/useTopSellingsContext";
import { useHappyCustomersContext } from "@src/hooks/useHappyCustomersContext";

import "@src/App.css";

export const App = ({ callbacks, content }: AppProps) => {
  const { handleSetInitialConfig } = useConfigContext();
  const { handleSetBrands } = useBrandsContext();
  const { handleSetNewArrivals } = useNewArrivalsContext();
  const { handleSetTopSellings } = useTopSellingsContext();
  const { handleSetReviews } = useHappyCustomersContext();

  const onInit = () => {
    handleSetInitialConfig({ callbacks: callbacks });
    handleSetBrands(content.brands);
    handleSetNewArrivals(content.newArrivals);
    handleSetTopSellings(content.topSellings);
    handleSetReviews(content.reviews);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <main className="main-home">
      <PresentationSection></PresentationSection>
      <BrandsSection></BrandsSection>
      <NewArrivalsSection></NewArrivalsSection>
      <hr className="hr-home hr-home-gallery"></hr>
      <TopSellingSection></TopSellingSection>
      <BrowseByDressStyleSection></BrowseByDressStyleSection>
      <OurHappyCustomersSection></OurHappyCustomersSection>
    </main>
  );
};
