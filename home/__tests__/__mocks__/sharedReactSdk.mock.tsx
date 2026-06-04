import type { JSX } from "react";
import type { Clothes } from "shared-core/sdk";

interface GalleryClothesStubProps {
  title: string;
  clothes: Clothes[] | null;
  className?: string;
  onClothesClick: (clothes: Clothes) => void;
}

export const GalleryClothes = ({
  title,
  clothes,
  onClothesClick,
}: GalleryClothesStubProps): JSX.Element => {
  return (
    <div data-testid="gallery-clothes">
      <h2>{title}</h2>

      {(clothes ?? []).map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={(): void => {
            onClothesClick(item);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
