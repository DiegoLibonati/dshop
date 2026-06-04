import type { GeneralState } from "@container/types/states";

export interface LoadingContext {
  register: () => () => void;
}

export interface GeneralContext {
  generalState: GeneralState;
  handleClickCloseNotification: () => void;
  handleClickMenuClose: () => void;
  handleClickCart: (e: MouseEvent) => void;
  handleClickMenu: (e: MouseEvent) => void;
  handleClickSearch: (e: MouseEvent) => void;
  handleSubmitSearch: (value: string) => void;
  handleSubmitSubscribeNewsletter: (value: string) => void;
  handleClickHeaderOption: () => void;
}
