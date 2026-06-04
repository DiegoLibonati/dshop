import React, { useEffect, useRef, useState } from "react";
import { SkeletonShimmer } from "shared-core/sdk";

import type { JSX } from "react";
import type { SharedComponentModule } from "shared-core/sdk";
import type { SharedMfeMountProps } from "@home/types/props";

const SharedMfeMount = <P extends object>({
  loader,
  componentProps,
  wrapperClass,
  loadingClass,
}: SharedMfeMountProps<P>): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    let mod: SharedComponentModule<P> | null = null;
    const el = containerRef.current;

    loader()
      .then((loaded) => {
        if (!active || !containerRef.current) return;

        mod = loaded;
        mod.mount(containerRef.current, componentProps);
        setMounted(true);
      })
      .catch((error: unknown) => {
        console.error("[Shared MFE Load Error]", error);
      });

    return (): void => {
      active = false;
      if (mod && el) mod.unmount(el);
    };
  }, []);

  return (
    <React.Fragment>
      {!mounted && <SkeletonShimmer className={loadingClass!} />}
      <div ref={containerRef} className={wrapperClass} hidden={!mounted} />
    </React.Fragment>
  );
};

export default SharedMfeMount;
