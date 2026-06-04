import type { JSX } from "react";
import type { TagSimpleProps } from "@shared-core/types/props";

import "@shared-core/components/Tags/TagSimple/TagSimple.css";

const TagSimple = ({ className, children, onClick }: TagSimpleProps): JSX.Element => {
  return (
    <div
      className={`tag-simple ${onClick && "tag-simple--pointer"} ${className}`}
      onClick={onClick}
    >
      {children && <h2 className="tag-simple__text">{children}</h2>}
    </div>
  );
};

export default TagSimple;
