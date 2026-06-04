import "@testing-library/jest-dom";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

beforeAll((): void => {
  mockMswServer.listen({ onUnhandledRequest: "error" });
});

afterEach((): void => {
  mockMswServer.resetHandlers();
});

afterAll((): void => {
  mockMswServer.close();
});
