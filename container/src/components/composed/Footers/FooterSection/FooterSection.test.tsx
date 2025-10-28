import { render, screen } from "@testing-library/react";

import { FooterSectionProps } from "@src/entities/props";

import { FooterSection } from "@src/components/composed/Footers/FooterSection/FooterSection";

type RenderComponent = {
  props: FooterSectionProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: FooterSectionProps = {
    title: "titulo",
    content: [{ link: "/hola", title: "Hola" }],
  };

  const { container } = render(
    <FooterSection title={props.title} content={props.content}></FooterSection>
  );

  return {
    props: props,
    container: container,
  };
};

describe("FooterSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component.", () => {
      const { container } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(".footer-section");

      expect(root).toBeInTheDocument();
    });

    test("It must render the title.", () => {
      const { props } = renderComponent();

      const title = screen.getByRole("heading", { name: props.title });

      expect(title).toBeInTheDocument();
    });

    test("It must render links.", () => {
      const { props } = renderComponent();

      props.content.forEach((c) => {
        const anchor = screen.getByRole("link", { name: `link-${c.title}` });

        expect(anchor).toBeInTheDocument();
        expect(anchor).toHaveAttribute("href", c.link);
        expect(anchor.textContent).toEqual(c.title);
      });
    });
  });
});
