import React from "react";

import { useBrandsContext } from "@src/hooks/useBrandsContext";

import "@src/components/composed/Sections/BrandsSection/BrandsSection.css";

// NOTE: This can be a array of imgs.

export const BrandsSection = () => {
  const { brands } = useBrandsContext();

  return (
    <section className="brands">
      {brands &&
        brands.map((brand) => {
          return (
            <article key={`brand_${brand}`} className="brands-brand">
              <h2 className="brands-brand__text">{brand}</h2>
            </article>
          );
        })}
    </section>
  );
};
