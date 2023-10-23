import React, { DependencyList, useEffect } from "react";
import { useTimeOutFn } from "./useTimeOutFn";

export type UseDebounceReturn = [() => boolean | null, () => void];

export const useDebounce = (
  fn: Function,
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn => {
  const [isReady, cancel, reset] = useTimeOutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
};
