import { useEffect, useState } from "react";

import type { JSX } from "react";
import type { CounterWithActionsProps } from "@shared-core/types/props";

import "@shared-core/components/Counters/CounterWithActions/CounterWithActions.css";

const CounterWithActions = ({
  className,
  limit,
  onChange,
}: CounterWithActionsProps): JSX.Element => {
  const [count, setCount] = useState<number>(1);

  const handleClickMinus = (): void => {
    setCount((state) => {
      if (state === 1) return 1;
      return state - 1;
    });
  };

  const handleClickPlus = (): void => {
    setCount((state) => {
      if (limit && state === limit) return limit;
      return state + 1;
    });
  };

  const onCountChange = (): void => {
    onChange(count);
  };

  useEffect(onCountChange, [count]);

  return (
    <div className={`counter-with-actions ${className}`}>
      <button
        className="counter-with-actions__action"
        onClick={handleClickMinus}
        aria-label="action minus"
      >
        &minus;
      </button>

      <h2 className="counter-with-actions__count">{count}</h2>

      <button
        className="counter-with-actions__action"
        onClick={handleClickPlus}
        aria-label="action plus"
      >
        &#x2B;
      </button>
    </div>
  );
};

export default CounterWithActions;
