import type { JSX } from "react";

import { useBrandsContext } from "@home/hooks/useBrandsContext";

import "@home/components/Sections/BrandsSection/BrandsSection.css";

const BrandsSection = (): JSX.Element => {
  const { brandsState } = useBrandsContext();

  return (
    <section className="brands">
      {brandsState.brands?.map((brand) => (
        <article key={`brand_${brand}`} className="brands-brand">
          <h2 className="brands-brand__text">{brand}</h2>
        </article>
      ))}
    </section>
  );
};

export default BrandsSection;
