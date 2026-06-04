import React, { useEffect, useRef, useState } from "react";
import { SkeletonShimmer } from "shared-core/sdk";

import type { JSX } from "react";
import type { SharedComponentModule } from "shared-core/sdk";
import type { SharedMfeMountProps } from "@container/types/props";

import { useLoadable } from "@container/hooks/useLoadable";

const SharedMfeMount = <P extends object>({
  loader,
  componentProps,
  wrapperClass,
  loadingClass,
}: SharedMfeMountProps<P>): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const moduleRef = useRef<SharedComponentModule<P> | null>(null);

  useLoadable(!mounted && !failed);

  useEffect(() => {
    let active = true;
    const el = containerRef.current;

    loader()
      .then((loaded) => {
        if (!active || !containerRef.current) return;

        moduleRef.current = loaded;
        loaded.mount(containerRef.current, componentProps);
        setMounted(true);
      })
      .catch((error: unknown) => {
        console.error("[Shared MFE Load Error]", error);
        if (active) setFailed(true);
      });

    return (): void => {
      active = false;
      if (moduleRef.current && el) moduleRef.current.unmount(el);
      moduleRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const el = containerRef.current;

    if (moduleRef.current && el) moduleRef.current.mount(el, componentProps);
  }, [componentProps, mounted]);

  return (
    <React.Fragment>
      {!mounted && <SkeletonShimmer className={loadingClass!} />}
      <div ref={containerRef} className={wrapperClass} hidden={!mounted} />
    </React.Fragment>
  );
};

export default SharedMfeMount;
