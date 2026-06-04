import type { JSX } from "react";
import type { FooterSectionProps } from "@container/types/props";

import "@container/components/Footers/FooterSection/FooterSection.css";

const FooterSection = ({ title, content }: FooterSectionProps): JSX.Element => {
  return (
    <div className="footer-section">
      <h2 className="footer-section__title">{title}</h2>

      {content.map((c) => (
        <a
          key={`footer-link-content-anchor-${c.title}`}
          href={c.link}
          aria-label={`link-${c.title}`}
          className="footer-section__link"
        >
          {c.title}
        </a>
      ))}
    </div>
  );
};

export default FooterSection;
