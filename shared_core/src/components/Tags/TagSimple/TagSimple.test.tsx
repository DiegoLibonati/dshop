import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { TagSimpleProps } from "@src/entities/props";

import { TagSimple } from "@src/components/Tags/TagSimple/TagSimple";

type RenderComponent = {
  props: TagSimpleProps & { onClick: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: TagSimpleProps & { onClick: jest.Mock } = {
    children: "test",
    onClick: jest.fn(),
    className: "test-svg",
  };

  const { container } = render(
    <TagSimple onClick={props.onClick} className={props.className}>
      {props.children}
    </TagSimple>
  );

  return {
    props: props,
    container: container,
  };
};

describe("TagSimple.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the tag simple", () => {
      const { container } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(".tag-simple");

      expect(root).toBeInTheDocument();
    });

    test("It must render text.", () => {
      const { props } = renderComponent();

      const heading = screen.getByRole("heading", {
        name: props.children as string,
      });

      expect(heading).toBeInTheDocument();
    });

    test("It should execute the relevant function when the tag is clicked.", async () => {
      const { container, props } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(".tag-simple");

      await user.click(root!);

      expect(props.onClick).toHaveBeenCalledTimes(1);
      expect(root!.classList.contains("tag-simple--pointer")).toBeTruthy();
    });
  });
});
