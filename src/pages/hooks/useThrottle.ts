import next from "next";
import { useEffect, useRef, useState } from "react";
import { useUnmount } from "./useUnmount";

export const useThrottle = <T>(value: T, ms: number = 200) => {
  const [state, updateState] = useState<T>(value);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(0) as any;

  useEffect(() => {
    if(!timeout.current) {
      updateState(value);
      const timeoutCallback = () => {
        if(hasNextValue.current) {
          hasNextValue.current = false;
          updateState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms)
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
  }, [value]);

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
}