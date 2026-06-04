import "zone.js";
import "zone.js/testing";
import "@angular/compiler";
import "@testing-library/jest-dom";

import { getTestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

import { resolveAngularTemplates } from "@tests/__mocks__/resolve-templates.mock";

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  teardown: { destroyAfterEach: true },
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

beforeAll(async (): Promise<void> => {
  await resolveAngularTemplates();
});
