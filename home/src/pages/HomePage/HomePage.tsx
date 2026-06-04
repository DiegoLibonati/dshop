import { useEffect } from "react";

import type { JSX } from "react";
import type { HomePageProps } from "@home/types/props";

import PresentationSection from "@home/components/Sections/PresentationSection/PresentationSection";
import BrandsSection from "@home/components/Sections/BrandsSection/BrandsSection";
import NewArrivalsSection from "@home/components/Sections/NewArrivalsSection/NewArrivalsSection";
import TopSellingSection from "@home/components/Sections/TopSellingSection/TopSellingSection";
import BrowseByDressStyleSection from "@home/components/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection";
import OurHappyCustomersSection from "@home/components/Sections/OurHappyCustomersSection/OurHappyCustomersSection";

import { useBrandsContext } from "@home/hooks/useBrandsContext";
import { useNewArrivalsContext } from "@home/hooks/useNewArrivalsContext";
import { useTopSellingsContext } from "@home/hooks/useTopSellingsContext";
import { useHappyCustomersContext } from "@home/hooks/useHappyCustomersContext";

import "@home/pages/HomePage/HomePage.css";

const HomePage = ({ brands, newArrivals, reviews, topSellings }: HomePageProps): JSX.Element => {
  const { handleSetBrands } = useBrandsContext();
  const { handleSetNewArrivals } = useNewArrivalsContext();
  const { handleSetTopSellings } = useTopSellingsContext();
  const { handleSetReviews } = useHappyCustomersContext();

  const onInit = (): void => {
    handleSetBrands(brands);
    handleSetNewArrivals(newArrivals);
    handleSetTopSellings(topSellings);
    handleSetReviews(reviews);
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

export default HomePage;
