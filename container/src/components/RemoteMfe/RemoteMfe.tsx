import { Suspense, lazy, useMemo } from "react";

import type { JSX } from "react";
import type { MfeModule } from "shared-core/sdk";
import type { RemoteMfeProps, RemoteMountProps } from "@container/types/props";

import RemoteMount from "@container/components/RemoteMfe/RemoteMount";
import LoadableFallback from "@container/components/LoadableFallback/LoadableFallback";

const RemoteMfe = ({
  loadModule,
  callbacks,
  mountData,
  wrapperClass,
}: RemoteMfeProps): JSX.Element => {
  const rawClassName = mountData?.className;
  const inferredWrapperClass =
    typeof rawClassName === "string" && rawClassName ? `${rawClassName}-wrapper` : undefined;
  const resolvedWrapperClass = wrapperClass ?? inferredWrapperClass;

  const LazyRemote = useMemo(
    () =>
      lazy(async () => {
        const raw = await loadModule();
        const mod: MfeModule = "default" in raw ? raw.default : raw;

        return {
          default: (props: Omit<RemoteMountProps, "mod">): JSX.Element => (
            <RemoteMount mod={mod} {...props} />
          ),
        };
      }),
    [loadModule]
  );

  return (
    <Suspense fallback={<LoadableFallback />}>
      <LazyRemote callbacks={callbacks} mountData={mountData} wrapperClass={resolvedWrapperClass} />
    </Suspense>
  );
};

export default RemoteMfe;
