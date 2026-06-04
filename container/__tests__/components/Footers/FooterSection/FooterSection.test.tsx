import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { FooterSectionProps } from "@container/types/props";

import FooterSection from "@container/components/Footers/FooterSection/FooterSection";

const renderComponent = (props: Partial<FooterSectionProps> = {}): RenderResult => {
  const defaultProps: FooterSectionProps = {
    title: "Company",
    content: [
      { title: "About", link: "/about" },
      { title: "Careers", link: "/careers" },
    ],
    ...props,
  };

  return render(<FooterSection {...defaultProps} />);
};

describe("FooterSection", () => {
  describe("rendering", () => {
    it("should render the section title as a heading", () => {
      renderComponent({ title: "Resources" });

      expect(screen.getByRole("heading", { name: "Resources" })).toBeInTheDocument();
    });

    it("should render one link per content item", () => {
      renderComponent();

      expect(screen.getAllByRole("link")).toHaveLength(2);
    });

    it("should render each link with its href, text and accessible label", () => {
      renderComponent({ content: [{ title: "Blog", link: "/resources/blog" }] });

      const link = screen.getByRole("link", { name: "link-Blog" });

      expect(link).toHaveAttribute("href", "/resources/blog");
      expect(link).toHaveTextContent("Blog");
    });
  });

  describe("edge cases", () => {
    it("should render no links when the content is empty", () => {
      renderComponent({ content: [] });

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });
});
