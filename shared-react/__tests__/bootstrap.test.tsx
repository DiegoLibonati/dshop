import { act, waitFor, within } from "@testing-library/react";

describe("bootstrap", () => {
  it("should render the App into the root element", async () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    await act(async () => {
      await import("@shared-react/bootstrap");
    });

    expect(within(root).getByRole("heading", { name: "Component Showcase" })).toBeInTheDocument();

    await waitFor(() => {
      expect(document.querySelectorAll<HTMLDivElement>(".skeleton-shimmer")).toHaveLength(0);
    });
  });
});
