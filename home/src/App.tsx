import type { JSX } from "react";
import type { HomePageProps } from "@home/types/props";

import HomePage from "@home/pages/HomePage/HomePage";

import { BrandsProvider } from "@home/contexts/BrandsContext/BrandsProvider";
import { DressStylesProvider } from "@home/contexts/DressStylesContext/DressStylesProvider";
import { HappyCustomersProvider } from "@home/contexts/HappyCustomersContext/HappyCustomersProvider";
import { NewArrivalsProvider } from "@home/contexts/NewArrivalsContext/NewArrivalsProvider";
import { TopSellingsProvider } from "@home/contexts/TopSellingsContext/TopSellingsProvider";

const App = ({ brands, newArrivals, reviews, topSellings }: HomePageProps): JSX.Element => {
  return (
    <BrandsProvider>
      <NewArrivalsProvider>
        <TopSellingsProvider>
          <DressStylesProvider>
            <HappyCustomersProvider>
              <HomePage
                brands={brands}
                newArrivals={newArrivals}
                reviews={reviews}
                topSellings={topSellings}
              ></HomePage>
            </HappyCustomersProvider>
          </DressStylesProvider>
        </TopSellingsProvider>
      </NewArrivalsProvider>
    </BrandsProvider>
  );
};

export default App;
