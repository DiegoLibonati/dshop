import { resolveAngularTemplates } from "@tests/__mocks__/resolve-templates.mock";

describe("header.module", () => {
  it("should expose mount and unmount bound to the header component", async () => {
    await import("@shared-angular/components/headers/header/header.component");
    await resolveAngularTemplates();

    const headerModule = await import("@shared-angular/components/headers/header/header.module");

    expect(typeof headerModule.mount).toBe("function");
    expect(typeof headerModule.unmount).toBe("function");
  });
});
