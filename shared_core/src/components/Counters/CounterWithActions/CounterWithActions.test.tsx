import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { CounterWithActionsProps } from "@src/entities/props";

import { CounterWithActions } from "@src/components/Counters/CounterWithActions/CounterWithActions";

type RenderComponent = {
  props: CounterWithActionsProps & { onChange: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (limit: number): RenderComponent => {
  const props: CounterWithActionsProps & { onChange: jest.Mock } = {
    limit: limit,
    onChange: jest.fn(),
    className: "test-svg",
  };

  const { container } = render(
    <CounterWithActions
      limit={props.limit}
      className={props.className}
      onChange={props.onChange}
    ></CounterWithActions>
  );

  return {
    props: props,
    container: container,
  };
};

describe("TagSimple.tsx", () => {
  describe("General Tests.", () => {
    const limit = 2;

    test("It should render the counter with actions.", () => {
      const { container } = renderComponent(limit);

      const root = container.querySelector<HTMLDivElement>(
        ".counter-with-actions"
      );

      expect(root).toBeInTheDocument();
    });

    test("It should render the actions and the counter value.", () => {
      renderComponent(limit);

      const btnMinus = screen.getByRole("button", { name: "action minus" });
      const btnPlus = screen.getByRole("button", { name: "action plus" });
      const value = screen.getByRole("heading", { name: "1" });

      expect(btnMinus).toBeInTheDocument();
      expect(btnPlus).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });

    test("It should go up to the counter when it is touched in plus.", async () => {
      const { props } = renderComponent(limit);

      const btnPlus = screen.getByRole("button", { name: "action plus" });

      await user.click(btnPlus);

      const value = await screen.findByRole("heading", { name: "2" });

      expect(value).toBeInTheDocument();
      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.onChange).toHaveBeenCalledWith(2);
    });

    test("It should go down to the counter when it is touched in minus.", async () => {
      const { props } = renderComponent(limit);

      const btnPlus = screen.getByRole("button", { name: "action plus" });

      await user.click(btnPlus);

      const valuePlus = await screen.findByRole("heading", { name: "2" });

      expect(valuePlus).toBeInTheDocument();

      const btnMinus = screen.getByRole("button", { name: "action minus" });

      await user.click(btnMinus);

      const valueMinus = await screen.findByRole("heading", { name: "1" });

      expect(valueMinus).toBeInTheDocument();

      await user.click(btnMinus);

      const valueMinusWithLimit = await screen.findByRole("heading", {
        name: "1",
      });

      expect(valueMinusWithLimit).toBeInTheDocument();
      expect(props.onChange).toHaveBeenCalledTimes(3);
    });
  });
});
