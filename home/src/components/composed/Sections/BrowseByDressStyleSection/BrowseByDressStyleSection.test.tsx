import { render, screen } from "@testing-library/react";

import { DressStyle } from "@src/entities/app";

import { BrowseByDressStyleSection } from "@src/components/composed/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection";

import { useDressStylesContext } from "@src/hooks/useDressStylesContext";

type RenderComponent = {
  container: HTMLElement;
  props: {
    dressStyles: DressStyle[];
    handleSetDressStyles: jest.Mock;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    dressStyles: ["casual", "formal", "party", "gym"] as DressStyle[],
    handleSetDressStyles: jest.fn(),
  };

  (useDressStylesContext as jest.Mock).mockReturnValue(props);

  const { container } = render(<BrowseByDressStyleSection />);

  return {
    container: container,
    props: props,
  };
};

jest.mock("@src/hooks/useDressStylesContext", () => ({
  useDressStylesContext: jest.fn(),
}));

jest.mock("@src/constants/lang", () => ({
  lang: {
    en: {
      browseByDressStyle: {
        title: "Browse by dress style",
      },
    },
  },
}));

describe("BrowseByDressStyleSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component wrapper and main section.", () => {
      const { container } = renderComponent();

      const wrapper = container.querySelector<HTMLDivElement>(
        ".browse-by-dress-style-wrapper"
      );
      const main = container.querySelector<HTMLDivElement>(
        ".browse-by-dress-style"
      );

      expect(wrapper).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });

    test("It must render the title.", () => {
      renderComponent();

      const title = screen.getByRole("heading", {
        name: "Browse by dress style",
      });

      expect(title).toBeInTheDocument();
    });

    test("It must render all illustration components.", () => {
      const { props } = renderComponent();

      props.dressStyles.forEach((type) => {
        const illustration = screen.getByRole("button", {
          name: `illustration ${type}`,
        });

        expect(illustration).toBeInTheDocument();
      });
    });
  });

  describe("Initialization behavior.", () => {
    test("It must call handleSetDressStyles on mount with the correct styles.", () => {
      const { props } = renderComponent();

      expect(props.handleSetDressStyles).toHaveBeenCalledTimes(1);
      expect(props.handleSetDressStyles).toHaveBeenCalledWith([
        "casual",
        "formal",
        "party",
        "gym",
      ]);
    });
  });
});
