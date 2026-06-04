import { Suspense } from "react";
import { SkeletonShimmer } from "shared-core/sdk";

import type { JSX } from "react";
import type { SharedMfeProps } from "@shared-react/types/props";

const SharedMfe = <P extends object>({
  component: Component,
  componentProps,
  wrapperClass,
  loadingClass,
}: SharedMfeProps<P>): JSX.Element => {
  const rawClassName = (componentProps as { className?: unknown }).className;
  const inferredWrapperClass =
    typeof rawClassName === "string" && rawClassName ? `${rawClassName}-wrapper` : undefined;
  const resolvedWrapperClass = wrapperClass ?? inferredWrapperClass;

  return (
    <div data-mfe="shared-core" className={resolvedWrapperClass}>
      <Suspense fallback={<SkeletonShimmer className={loadingClass!} />}>
        <Component {...componentProps} />
      </Suspense>
    </div>
  );
};

export default SharedMfe;
