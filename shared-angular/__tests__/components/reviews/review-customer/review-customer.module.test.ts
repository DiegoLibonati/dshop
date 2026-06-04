import { resolveAngularTemplates } from "@tests/__mocks__/resolve-templates.mock";

describe("review-customer.module", () => {
  it("should expose mount and unmount bound to the review customer component", async () => {
    await import("@shared-angular/components/reviews/review-customer/review-customer.component");
    await resolveAngularTemplates();

    const reviewCustomerModule =
      await import("@shared-angular/components/reviews/review-customer/review-customer.module");

    expect(typeof reviewCustomerModule.mount).toBe("function");
    expect(typeof reviewCustomerModule.unmount).toBe("function");
  });
});
