import type { JSX } from "react";

import ItemClothes from "@shared-react/components/Items/ItemClothes/ItemClothes";
import SubscribeNewsletter from "@shared-react/components/Subscribes/SubscribeNewsletter/SubscribeNewsletter";
import FooterWithSubscribeNewsletter from "@shared-react/components/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter";
import LoaderScreen from "@shared-react/components/Loaders/LoaderScreen/LoaderScreen";
import GalleryClothes from "@shared-react/components/Galleries/GalleryClothes/GalleryClothes";

import { CLOTHES_1 } from "@shared-react/constants/clothes";

import "@shared-react/App.css";

const App = (): JSX.Element => {
  return (
    <div className="test-container">
      <h1 className="test-container__title">Component Showcase</h1>

      <div className="component">
        <h2 className="component__title">Item Clothes</h2>
        <ItemClothes
          src="https://i0.wp.com/ropaandroll.com/wp-content/uploads/2024/07/RMC-fallen-staked-ropa-and-roll-1.png?fit=1536%2C1536&ssl=1"
          name="T-shirt with Tape Details"
          rate={4}
          price={120}
          discount={10}
        ></ItemClothes>
      </div>

      <div className="component">
        <h2 className="component__title">Footer With Subscribe Newsletter</h2>
        <FooterWithSubscribeNewsletter
          className="footer-with-subscribe-newsletter-showcase"
          title="DShop"
          description="We have clothes that suits your style and which you’re proud to wear. From women to men."
          instagram={"https://www.instagram.com"}
          facebook={"https://www.facebook.com"}
          twitter={"https://www.x.com"}
          onSubmitSubscribe={(inputValue) => {
            console.log(inputValue);
          }}
        >
          <div>Links 1</div>
          <div>Links 2</div>
          <div>Links 3</div>
          <div>Links 4</div>
        </FooterWithSubscribeNewsletter>
      </div>

      <div className="component">
        <h2 className="component__title">Subscribe Newsletter</h2>
        <SubscribeNewsletter
          title="STAY UPTO DATE ABOUT OUR LATEST OFFERS"
          submitLabel="Subscribe to Newsletter"
          onSubmit={(inputValue) => {
            console.log(inputValue);
          }}
        ></SubscribeNewsletter>
      </div>

      <div className="component">
        <h2 className="component__title">Loader Screen</h2>
        <LoaderScreen className="loader-screen-app-test"></LoaderScreen>
      </div>

      <div className="component">
        <h2 className="component__title">Gallery Clothes</h2>
        <GalleryClothes
          title="YOU MIGHT ALSO LIKE"
          clothes={CLOTHES_1}
          onClothesClick={(c) => {
            console.log(c);
          }}
        ></GalleryClothes>
      </div>

      {/* Podés agregar más componentes aquí */}
    </div>
  );
};

export default App;
