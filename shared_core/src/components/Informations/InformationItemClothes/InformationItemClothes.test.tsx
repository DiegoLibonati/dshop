import { render, screen } from "@testing-library/react";

import { InformationItemClothesProps } from "@src/entities/props";

import { InformationItemClothes } from "@src/components/Informations/InformationItemClothes/InformationItemClothes.tsx";

import { getFinalPriceByDiscount } from "@src/helpers/getFinalPriceByDiscount";

type RenderComponent = {
  props: InformationItemClothesProps;
  container: HTMLElement;
};

const renderComponent = (
  discount: number,
  description: string
): RenderComponent => {
  const props: InformationItemClothesProps = {
    name: "namecito",
    discount: discount,
    price: 100,
    rate: 3,
    className: "test-class",
    description: description,
  };

  const { container } = render(
    <InformationItemClothes
      discount={props.discount}
      name={props.name}
      price={props.price}
      rate={props.rate}
      description={props.description}
      className={props.className}
    >
      {props.children}
    </InformationItemClothes>
  );

  return {
    props: props,
    container: container,
  };
};

describe("InformationItemClothes.tsx", () => {
  const maxStars = 5;

  describe("General Tests.", () => {
    const discount = 0;
    const description = "";

    test("It must render the InformationItemClothes component.", () => {
      const { container, props } = renderComponent(discount, description);

      const root = container.querySelector<HTMLDivElement>(
        ".information-item-clothes"
      );
      const name = screen.getByRole("heading", {
        name: props.name,
      }) as HTMLHeadingElement;
      const rateStars = container.querySelector<HTMLDivElement>(".rate-stars");
      const stars =
        container.querySelectorAll<HTMLElement>(".rate-stars__star");
      const rate = screen.getByText(`${props.rate}/${maxStars}`);
      const finalPrice = screen.getByRole("heading", {
        name: `$${props.price}`,
      }) as HTMLHeadingElement;

      expect(root).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(rateStars).toBeInTheDocument();
      expect(stars).toHaveLength(maxStars);
      expect(rate).toBeInTheDocument();
      expect(finalPrice).toBeInTheDocument();
    });
  });

  describe("With discount.", () => {
    const discount = 10;
    const description = "";

    test("It must render the InformationItemClothes component with discount.", () => {
      const { props } = renderComponent(discount, description);

      const finalPrice = getFinalPriceByDiscount(props.price, discount);

      const finalPriceElement = screen.getByRole("heading", {
        name: `$${finalPrice}`,
      }) as HTMLHeadingElement;
      const price = screen.getByRole("heading", {
        name: `$${props.price}`,
      }) as HTMLHeadingElement;
      const discountElement = screen.getByText(
        `-${discount}%`
      ) as HTMLParagraphElement;

      expect(finalPriceElement).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(discountElement).toBeInTheDocument();
    });
  });

  describe("Without discount.", () => {
    const discount = 0;
    const description = "";

    test("It must render the InformationItemClothes component without discount.", () => {
      const { props } = renderComponent(discount, description);

      const price = screen.queryByRole("heading", {
        name: `$${props.price}`,
      }) as HTMLHeadingElement;
      const discountElement = screen.queryByText(
        `-${discount}%`
      ) as HTMLParagraphElement;

      expect(price).toBeInTheDocument();
      expect(discountElement).not.toBeInTheDocument();
    });
  });

  describe("Without description.", () => {
    const discount = 0;
    const description = "";

    test("It must render the InformationItemClothes component without description.", () => {
      const { container } = renderComponent(discount, description);

      const descriptionElement = container.querySelector<HTMLParagraphElement>(
        ".information-item-clothes__description"
      );

      expect(descriptionElement).not.toBeInTheDocument();
    });
  });

  describe("With description.", () => {
    const discount = 0;
    const description = "asdasdasdasdasdasdasd1234213 12312231 3123";

    test("It must render the InformationItemClothes component with description.", () => {
      const { props } = renderComponent(discount, description);

      const descriptionElement = screen.getByText(props.description!);

      expect(descriptionElement).toBeInTheDocument();
    });
  });
});
