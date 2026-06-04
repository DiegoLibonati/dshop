import { resolveAngularTemplates } from "@tests/__mocks__/resolve-templates.mock";

describe("notification-bar.module", () => {
  it("should expose mount and unmount bound to the notification bar component", async () => {
    await import("@shared-angular/components/notifications/notification-bar/notification-bar.component");
    await resolveAngularTemplates();

    const notificationBarModule =
      await import("@shared-angular/components/notifications/notification-bar/notification-bar.module");

    expect(typeof notificationBarModule.mount).toBe("function");
    expect(typeof notificationBarModule.unmount).toBe("function");
  });
});
