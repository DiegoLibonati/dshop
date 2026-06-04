import type { Envs } from "@container/types/envs";

export const mockEnvs: Envs = {
  redirectIfRouteNotExists: false,
  appName: "",
  remoteHomeUrl: "",
  remoteProductDetailUrl: "",
  apiUrl: "",
};

export const mockEnvsWithRedirect: Envs = {
  ...mockEnvs,
  redirectIfRouteNotExists: true,
};
