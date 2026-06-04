import { http, HttpResponse } from "msw";

export const mockMswHandlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),
];
