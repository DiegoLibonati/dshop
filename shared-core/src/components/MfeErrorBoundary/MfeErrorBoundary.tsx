import { Component } from "react";

import type { ReactNode, ErrorInfo } from "react";
import type { MfeErrorBoundaryProps } from "@shared-core/types/props";
import type { MfeErrorBoundaryState } from "@shared-core/types/states";

class MfeErrorBoundary extends Component<MfeErrorBoundaryProps, MfeErrorBoundaryState> {
  constructor(props: MfeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): MfeErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[MFE Runtime Error]", error, info);
    this.props.onError?.(error);
  }

  override render(): ReactNode {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default MfeErrorBoundary;
