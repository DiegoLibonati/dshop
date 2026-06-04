import { Suspense } from "react";
import { SkeletonShimmer } from "shared-core/sdk";
import MfeErrorBoundary from "@shared-core/components/MfeErrorBoundary/MfeErrorBoundary";

import type { JSX } from "react";
import type { SharedMfeProps } from "@home/types/props";

import SharedMfeMount from "@home/components/SharedMfe/SharedMfeMount";

const SharedMfe = <P extends object>(props: SharedMfeProps<P>): JSX.Element => {
  const { componentProps, wrapperClass, loadingClass } = props;

  const rawClassName = (componentProps as { className?: unknown }).className;
  const inferredWrapperClass =
    typeof rawClassName === "string" && rawClassName ? `${rawClassName}-wrapper` : undefined;
  const resolvedWrapperClass = wrapperClass ?? inferredWrapperClass;

  if ("loader" in props) {
    return (
      <SharedMfeMount
        loader={props.loader}
        componentProps={componentProps}
        wrapperClass={resolvedWrapperClass}
        loadingClass={loadingClass}
      />
    );
  }

  const Component = props.component;
  const mfe = props.mfe ?? "shared-core";

  return (
    <div data-mfe={mfe} className={resolvedWrapperClass}>
      <MfeErrorBoundary>
        <Suspense fallback={<SkeletonShimmer className={loadingClass!} />}>
          <Component {...componentProps} />
        </Suspense>
      </MfeErrorBoundary>
    </div>
  );
};

export default SharedMfe;
