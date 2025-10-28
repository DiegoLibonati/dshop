import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { FormSearchProps } from "@src/entities/props";

import { FormSearch } from "@src/components/Forms/FormSearch/FormSearch";

type RenderComponent = {
  props: FormSearchProps & { onSubmit: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: FormSearchProps & { onSubmit: jest.Mock } = {
    onSubmit: jest.fn(),
    placeholder: "placeholder",
    className: "form-search-test",
  };

  const { container } = render(
    <FormSearch
      className={props.className}
      onSubmit={props.onSubmit}
      placeholder={props.placeholder}
    >
      {props.children}
    </FormSearch>
  );

  return {
    props: props,
    container: container,
  };
};

describe("MenuScreenWhite.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the form.", () => {
      const { container } = renderComponent();

      const form = container.querySelector<HTMLFormElement>(".form-search");

      expect(form).toBeInTheDocument();
    });

    test("It must render the search button and input.", () => {
      const { props } = renderComponent();

      const btnSearch = screen.getByRole("button", {
        name: "form search submit",
      });
      const input = screen.getByPlaceholderText(props.placeholder!);

      expect(btnSearch).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    test("The onSubmit function must be executed when the form is submitted.", async () => {
      const value = "pepe";

      const { props } = renderComponent();

      const btnSearch = screen.getByRole("button", {
        name: "form search submit",
      });
      const input = screen.getByPlaceholderText(props.placeholder!);

      await user.click(input);
      await user.keyboard(value);

      await user.click(btnSearch);

      expect(props.onSubmit).toHaveBeenCalledTimes(1);
      expect(props.onSubmit).toHaveBeenCalledWith(value);
    });
  });
});
