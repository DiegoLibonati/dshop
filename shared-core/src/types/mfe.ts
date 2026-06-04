// export interface MfeCounterChangeEvent {
//   type: "counterChange";
//   payload: { counter: number };
// }

// export type MfeEvent = MfeCounterChangeEvent;

export interface MfeCallbacks {
  onNavigate: (path: string) => void;
  //   onEvent?: ((event: MfeEvent) => void) | undefined;
}

export type MfeScope = "shared-core" | "shared-react" | "shared-angular";

export interface MfeDataSet {
  mfe: MfeScope;
}

export interface MfeMountOptions {
  dataset?: MfeDataSet;
  callbacks?: MfeCallbacks;
  onError?: (error: Error) => void;
}

export interface MfeModule {
  mount: (container: HTMLElement, options: MfeMountOptions) => void;
  unmount: (container: HTMLElement) => void;
}

export interface SharedComponentModule<P = object> {
  mount: (container: HTMLElement, props: P, options?: MfeMountOptions) => void;
  unmount: (container: HTMLElement) => void;
}
