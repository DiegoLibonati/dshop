import { Envs } from "@src/app/entities/envs";

const envs: Envs = {
  IS_DEV: process.env.NODE_ENV!,
};

export default envs;
