import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ItemClothesProps } from "@src/entities/props";

import { ItemClothes } from "@src/components/composed/Items/ItemClothes/ItemClothes.tsx";

type RenderComponent = {
  props: ItemClothesProps & {
    onClick: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (
  onClick: jest.Mock | undefined,
  discount: number
): RenderComponent => {
  const props: ItemClothesProps & {
    onClick: jest.Mock;
  } = {
    name: "Namecito",
    price: 100,
    rate: 5,
    src: "src",
    discount: discount,
    onClick: onClick!,
  };

  const { container } = render(
    <ItemClothes
      discount={props.discount}
      name={props.name}
      price={props.price}
      rate={props.rate}
      src={props.src}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </ItemClothes>
  );

  return {
    props: props,
    container: container,
  };
};

describe("ItemClothes.tsx", () => {
  describe("With onClick fn.", () => {
    const onClick = jest.fn();
    const discount = 0;

    test("It must render the ItemClothes component with onClick fn.", () => {
      const { container } = renderComponent(onClick, discount);

      const root = container.querySelector<HTMLDivElement>(".item-clothes");

      expect(root).toBeInTheDocument();
      expect(root!.classList.contains("item-clothes--pointer")).toEqual(true);
    });

    test("It must execute the onClick function when the ItemClothes is clicked.", async () => {
      const { container } = renderComponent(onClick, discount);

      const root = container.querySelector<HTMLDivElement>(".item-clothes");

      expect(root).toBeInTheDocument();

      await user.click(root!);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Without onClick fn.", () => {
    const onClick = undefined;
    const discount = 0;

    test("It must render the ItemClothes component without onClick fn.", () => {
      const { container } = renderComponent(onClick, discount);

      const root = container.querySelector<HTMLDivElement>(".item-clothes");

      expect(root).toBeInTheDocument();
      expect(root!.classList.contains("item-clothes--pointer")).toEqual(false);
    });
  });
});
