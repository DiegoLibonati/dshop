import { useEffect, useState, useCallback, useMemo } from "react";

import type { JSX } from "react";
import type { Clothes } from "shared-core/sdk";
import type { HomeAppProps } from "@container/types/props";

import RemoteMfe from "@container/components/RemoteMfe/RemoteMfe";

import { useLoadable } from "@container/hooks/useLoadable";

import productService from "@container/services/productService";

import { getParseClothes } from "@container/helpers/getParseClothes";
import { getRandomBetweenWithDecimals } from "@container/helpers/getRandomBetweenWithDecimals";

import { reviews } from "@container/constants/reviews";

import "@container/components/HomeApp/HomeApp.css";

const BRANDS = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

const HomeApp = ({ callbacks }: HomeAppProps): JSX.Element => {
  const [clothes, setClothes] = useState<Clothes[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadModule = useCallback(() => import("home/HomeApp"), []);
  const loadProducts = useCallback(async (isActive: () => boolean): Promise<void> => {
    try {
      const products = await productService.getAll();
      if (isActive()) setClothes(getParseClothes(products));
    } catch {
      if (isActive()) setError(true);
    } finally {
      if (isActive()) setLoading(false);
    }
  }, []);
  const mountData = useMemo(
    () => ({
      brands: BRANDS,
      newArrivals: clothes?.slice(0, 10) ?? [],
      topSellings:
        clothes?.slice(10, 20).map((c) => ({
          ...c,
          discount: getRandomBetweenWithDecimals(10, 30),
        })) ?? [],
      reviews,
    }),
    [clothes]
  );

  useLoadable(loading);

  useEffect(() => {
    let ignore = false;

    void loadProducts(() => !ignore);

    return (): void => {
      ignore = true;
    };
  }, [loadProducts]);

  if (error) {
    return (
      <div className="home-app-error" role="alert">
        <h2 className="home-app-error__title">Error loading home</h2>
        <p className="home-app-error__message">Please try again later.</p>
      </div>
    );
  }

  return (
    <RemoteMfe
      loadModule={loadModule}
      callbacks={callbacks}
      mountData={mountData}
      wrapperClass="home-wrapper"
    />
  );
};

export default HomeApp;
