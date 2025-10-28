import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { GalleryClothesProps } from "@src/entities/props";

import { GalleryClothes } from "@src/components/composed/Galleries/GalleryClothes/GalleryClothes.tsx";

import { CLOTHES_1 } from "@src/constants/clothes";

type RenderComponent = {
  props: GalleryClothesProps & {
    onClothesClick: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: GalleryClothesProps & {
    onClothesClick: jest.Mock;
  } = {
    title: "title titlecito",
    clothes: CLOTHES_1,
    onClothesClick: jest.fn(),
    className: "class test",
  };

  const { container } = render(
    <GalleryClothes
      title={props.title}
      clothes={props.clothes}
      className={props.className}
      onClothesClick={props.onClothesClick}
    >
      {props.children}
    </GalleryClothes>
  );

  return {
    props: props,
    container: container,
  };
};

describe("GalleryClothes.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the gallery title.", () => {
      const { container } = renderComponent();

      const gallery =
        container.querySelector<HTMLDivElement>(".gallery-clothes");

      expect(gallery).toBeInTheDocument();
    });

    test("It must render the title and all of the clothing.", () => {
      const { container, props } = renderComponent();

      const title = screen.getByRole("heading", { name: props.title });
      const clothes = container.querySelector<HTMLDivElement>(
        ".gallery-clothes__clothes"
      );

      expect(title).toBeInTheDocument();
      expect(clothes!.children.length).toBeLessThanOrEqual(4);
    });

    test("It must execute the relevant function when clicking on a piece of clothing.", async () => {
      const { container, props } = renderComponent();

      const clothes =
        container.querySelectorAll<HTMLDivElement>(".item-clothes");
      const item = clothes[0] as HTMLDivElement;

      await user.click(item);

      expect(props.onClothesClick).toHaveBeenCalledTimes(1);
      expect(props.onClothesClick).toHaveBeenCalledWith(props.clothes[0]);
    });
  });
});
