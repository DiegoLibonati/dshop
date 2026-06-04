import { act, within } from "@testing-library/react";

describe("bootstrap", () => {
  it("should render the App into the root element", async () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    await act(async () => {
      await import("@shared-core/bootstrap");
    });

    expect(within(root).getByRole("heading", { name: "Svgs Showcase" })).toBeInTheDocument();
  });
});
