import type { Envs } from "@home/types/envs";

const envs: Envs = {
  appName: import.meta.env.VITE_APP_NAME as string,
};

export default envs;
