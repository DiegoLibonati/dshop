import { InjectionToken } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

describe("mfe-callbacks.token", () => {
  describe("token definition", () => {
    it("should be an instance of InjectionToken", () => {
      expect(MFE_CALLBACKS).toBeInstanceOf(InjectionToken);
    });

    it("should carry the MfeCallbacks description", () => {
      expect(MFE_CALLBACKS.toString()).toContain("MfeCallbacks");
    });
  });

  describe("dependency injection", () => {
    it("should resolve the provided callbacks value", () => {
      TestBed.configureTestingModule({
        providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
      });

      const injected = TestBed.inject(MFE_CALLBACKS);

      expect(injected).toBe(mockCallbacks);
    });

    it("should forward the path to onNavigate when invoked", () => {
      TestBed.configureTestingModule({
        providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
      });

      const injected = TestBed.inject(MFE_CALLBACKS);
      injected.onNavigate("/products");

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith("/products");
    });
  });
});
