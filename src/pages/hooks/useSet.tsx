import React, { useState, useMemo, useCallback } from "react";

export interface Actions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  has: (key: K) => void;
  reset: () => void;
}

export function useSet<T>(initialState = new Set<T>()): [Set<T>, Actions<T>] {
  const [set, setSet] = useState(initialState);

  const stableActions = useMemo(() => {
    const add = (item: T) =>
      setSet((pre) => new Set([...Array.from(pre), item]));
    const remove = (item: T) =>
      setSet((pre) => new Set(Array.from(pre).filter((ele) => ele !== item)));
    const toggle = (item: T) =>
      set.has(item)
        ? setSet(
            (pre) => new Set(Array.from(pre).filter((ele) => ele !== item))
          )
        : setSet((pre) => new Set([...Array.from(pre), item]));

    return {
      add,
      remove,
      toggle,
      reset: () => setSet(initialState),
    };
  }, [setSet]);

  const utils = {
    has: useCallback((item: T) => set.has(item), [set]),
    ...stableActions,
  };

  return [set, utils];
}
