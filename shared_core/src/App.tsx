import React from "react";

import { SvgStarToFill } from "@src/components/Svgs/SvgStarToFill/SvgStarToFill";
import { SvgChevronDown } from "@src/components/Svgs/SvgChevronDown/SvgChevronDown";
import { SvgChevronUp } from "@src/components/Svgs/SvgChevronUp/SvgChevronUp";
import { SvgHamburgerMenu } from "@src/components/Svgs/SvgHamburgerMenu/SvgHamburgerMenu";
import { SvgCartShopping } from "@src/components/Svgs/SvgCartShopping/SvgCartShopping";
import { SvgSearch } from "@src/components/Svgs/SvgSearch/SvgSearch";
import { SvgSkyStar } from "@src/components/Svgs/SvgSkyStar/SvgSkyStar";
import { SvgArrowLeft } from "@src/components/Svgs/SvgArrowLeft/SvgArrowLeft";
import { SvgArrowRight } from "@src/components/Svgs/SvgArrowRight/SvgArrowRight";
import { SvgTwitter } from "@src/components/Svgs/SvgTwitter/SvgTwitter";
import { SvgFacebook } from "@src/components/Svgs/SvgFacebook/SvgFacebook";
import { SvgInstagram } from "@src/components/Svgs/SvgInstagram/SvgInstagram";
import { SvgClose } from "@src/components/Svgs/SvgClose/SvgClose";
import { SvgCheck } from "@src/components/Svgs/SvgCheck/SvgCheck";
import { ButtonBlack } from "@src/components/Buttons/ButtonBlack/ButtonBlack";
import { ButtonWhite } from "@src/components/Buttons/ButtonWhite/ButtonWhite";
import { ImageWithBackgroundColor } from "@src/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor";
import { InformationItemClothes } from "@src/components/Informations/InformationItemClothes/InformationItemClothes";
import { RateStars } from "@src/components/Ratings/RateStars/RateStars";
import { SliderSnapX } from "@src/components/Sliders/SliderSnapX/SliderSnapX";
import { AnchorCircular } from "@src/components/Anchors/AnchorCircular/AnchorCircular";
import { MenuScreenWhite } from "@src/components/Menus/MenuScreenWhite/MenuScreenWhite";
import { FormSearch } from "@src/components/Forms/FormSearch/FormSearch";
import { ColorCircle } from "@src/components/Colors/ColorCircle/ColorCircle";
import { TagSimple } from "@src/components/Tags/TagSimple/TagSimple";
import { CounterWithActions } from "@src/components/Counters/CounterWithActions/CounterWithActions";
import { SkeletonShimmer } from "@src/components/Skeletons/SkeletonShimmer/SkeletonShimmer";
import { LoaderCircular } from "@src/components/Loaders/LoaderCircular/LoaderCircular";

import "@src/App.css";

export const App = () => {
  return (
    <div className="test-container">
      <h1 className="test-container__title">Svgs Showcase</h1>

      <div className="component">
        <h2 className="component__title">ButtonBlack</h2>
        <ButtonBlack
          ariaLabel="test-button"
          className="test-clas-2"
          rounded={true}
        >
          Test 123 321
        </ButtonBlack>
      </div>

      <div className="component">
        <h2 className="component__title">ButtonWhite</h2>
        <ButtonWhite
          ariaLabel="test-button-2"
          className="test-clas-3"
          rounded={true}
          borderGray={true}
        >
          Test 123 321
        </ButtonWhite>
      </div>

      <div className="component">
        <h2 className="component__title">
          ImageWithBackgroundColor not Active
        </h2>
        <ImageWithBackgroundColor
          src="https://i0.wp.com/ropaandroll.com/wp-content/uploads/2024/07/RMC-fallen-staked-ropa-and-roll-1.png?fit=1536%2C1536&ssl=1"
          alt="T-shirt with Tape Details"
          bgColor="#f0eeed"
          isActive={false}
        ></ImageWithBackgroundColor>
      </div>

      <div className="component">
        <h2 className="component__title">ImageWithBackgroundColor Active</h2>
        <ImageWithBackgroundColor
          src="https://i0.wp.com/ropaandroll.com/wp-content/uploads/2024/07/RMC-fallen-staked-ropa-and-roll-1.png?fit=1536%2C1536&ssl=1"
          alt="T-shirt with Tape Details"
          bgColor="#f0eeed"
          isActive={true}
        ></ImageWithBackgroundColor>
      </div>

      <div className="component">
        <h2 className="component__title">InformationItemClothes</h2>
        <InformationItemClothes
          name="Item 1234 Gs2"
          discount={10}
          price={200}
          rate={4}
          description="This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."
        ></InformationItemClothes>
      </div>

      <div className="component">
        <h2 className="component__title">RateStars</h2>
        <RateStars
          max={5}
          value={4}
          inColor="gold"
          outColor="white"
        ></RateStars>
      </div>

      <div className="component">
        <h2 className="component__title">SliderSnapX</h2>
        <SliderSnapX>
          {Array.from({ length: 5 }, (_, i) => {
            const n = i + 1;

            return (
              <ImageWithBackgroundColor
                key={`slider-snap-x-item-${n}`}
                src="https://i0.wp.com/ropaandroll.com/wp-content/uploads/2024/07/RMC-fallen-staked-ropa-and-roll-1.png?fit=1536%2C1536&ssl=1"
                alt="T-shirt with Tape Details"
                bgColor="#f0eeed"
                isActive={false}
              />
            );
          })}
        </SliderSnapX>
      </div>

      <div className="component">
        <h2 className="component__title">AnchorCircular</h2>
        <AnchorCircular
          ariaLabel="test-ar"
          href="www.google.com"
          borderGray={true}
          className="class-test-2"
        >
          <SvgFacebook
            width={6}
            height={12}
            className="class-test-3"
          ></SvgFacebook>
        </AnchorCircular>
      </div>

      <div className="component">
        <h2 className="component__title">MenuScreenWhite</h2>
        <MenuScreenWhite className="menu-screen-white--no-fixed">
          Hola
        </MenuScreenWhite>
      </div>

      <div className="component">
        <h2 className="component__title">FormSearch</h2>
        <FormSearch
          onSubmit={(inputValue) => {
            console.log(inputValue);
          }}
          placeholder="Search for products..."
        ></FormSearch>
      </div>

      <div className="component">
        <h2 className="component__title">Color Circle</h2>
        <ColorCircle color="#09f"></ColorCircle>
      </div>

      <div className="component">
        <h2 className="component__title">Color Circle Active</h2>
        <ColorCircle color="#09f" isActive={true}></ColorCircle>
      </div>

      <div className="component">
        <h2 className="component__title">Tag Simple</h2>
        <TagSimple className="tag-simple-test">Large</TagSimple>
      </div>

      <div className="component">
        <h2 className="component__title">Counter With Actions</h2>
        <CounterWithActions
          onChange={(value) => {
            console.log(value);
          }}
        ></CounterWithActions>
      </div>

      <div className="component">
        <h2 className="component__title">Skeleton Shimmer</h2>
        <SkeletonShimmer rounded={true}></SkeletonShimmer>
      </div>

      <div className="component">
        <h2 className="component__title">Loader Circular</h2>
        <LoaderCircular></LoaderCircular>
      </div>

      <div className="component">
        <h2 className="component__title">SvgStarToFill</h2>
        <SvgStarToFill
          fill={"75"}
          inColor="#09feee"
          outColor="#ffffff"
        ></SvgStarToFill>
      </div>

      <div className="component">
        <h2 className="component__title">SvgChevronDown</h2>
        <SvgChevronDown></SvgChevronDown>
      </div>

      <div className="component">
        <h2 className="component__title">SvgChevronUp</h2>
        <SvgChevronUp></SvgChevronUp>
      </div>

      <div className="component">
        <h2 className="component__title">SvgHamburgerMenu</h2>
        <SvgHamburgerMenu></SvgHamburgerMenu>
      </div>

      <div className="component">
        <h2 className="component__title">SvgCartShopping</h2>
        <SvgCartShopping></SvgCartShopping>
      </div>

      <div className="component">
        <h2 className="component__title">SvgSearch</h2>
        <SvgSearch></SvgSearch>
      </div>

      <div className="component">
        <h2 className="component__title">SvgSkyStar</h2>
        <SvgSkyStar></SvgSkyStar>
      </div>

      <div className="component">
        <h2 className="component__title">SvgArrowLeft</h2>
        <SvgArrowLeft></SvgArrowLeft>
      </div>

      <div className="component">
        <h2 className="component__title">SvgArrowLeft</h2>
        <SvgArrowRight></SvgArrowRight>
      </div>

      <div className="component">
        <h2 className="component__title">SvgTwitter</h2>
        <SvgTwitter fill="black"></SvgTwitter>
      </div>

      <div className="component">
        <h2 className="component__title">SvgFacebook</h2>
        <SvgFacebook fill="black"></SvgFacebook>
      </div>

      <div className="component">
        <h2 className="component__title">SvgInstagram</h2>
        <SvgInstagram fill="black"></SvgInstagram>
      </div>

      <div className="component">
        <h2 className="component__title">SvgClose</h2>
        <SvgClose fill="black"></SvgClose>
      </div>

      <div className="component">
        <h2 className="component__title">SvgCheck</h2>
        <SvgCheck fill="black"></SvgCheck>
      </div>

      {/* Podés agregar más componentes aquí */}
    </div>
  );
};
