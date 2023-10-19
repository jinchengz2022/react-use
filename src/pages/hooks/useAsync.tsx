import React, { useRef, useCallback, useState } from "react";

import { useFirstMountState } from "./useFirstMountState";

export const useAsyncFn = (
  fn: (...args: any) => Promise<any>,
  deps: unknown[] = [],
  initialState = { loading: false }
) => {
  const lastCallId = useRef(0);
  const isMounted = useFirstMountState();
  const [state, update] = useState<Record<string, any>>(initialState);

  const callback = useCallback((...args: Parameters<any>): ReturnType<any> => {
    const callId = ++lastCallId.current;

    if (!state.loading) {
      update((pre) => ({ ...pre, loading: true }));
    }

    return fn(...args).then(
      (val) => {
        isMounted &&
          callId === lastCallId.current &&
          update({ val, loading: false });

        return val;
      },
      (err) => {
        isMounted &&
          callId === lastCallId.current &&
          update({ err, loading: false });

        return err;
      }
    );
  }, deps);

  return [state, callback];
};
