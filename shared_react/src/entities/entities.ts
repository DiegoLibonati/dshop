export type Debug = boolean;

export type MountOptions = {
  idComponent: Component;
  props?: Record<string, unknown>;
  debug?: Debug;
};

export type UnMountOptions = {
  debug?: Debug;
};
