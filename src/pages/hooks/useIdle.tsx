import React, { useState, useEffect } from "react";
import { throttle } from "throttle-debounce";

import { off, on } from "./../utils/listen";

const defaultEvents = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
];
const oneMinute = 60e3;

/**
 * 跟踪用户是否处于活跃状态
 * @param ms
 * @param initialState
 * @param events
 */
export const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents
) => {
  const [state, updateState] = useState(initialState);

  useEffect(() => {
    let mouted = true;
    let timeout: any;
    let localState: boolean = state;
    const set = (newState: boolean) => {
      if (mouted) {
        localState = newState;
        updateState(newState);
      }
    };

    const onEvent = throttle(50, () => {
      if (localState) {
        set(false);
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => set(true), ms);
    });

    const onVisibility = () => {
      if (!document.hidden) {
        onEvent();
      }
    };

    for (let k = 0; k < events.length; k++) {
      on(window, events[k], onEvent);
    }

    on(document, "visibilitychange", onVisibility);

    timeout = setTimeout(() => set(true), ms);

    return () => {
      mouted = false;

      for (let k = 0; k < events.length; k++) {
        off(window, events[k], onEvent);
      }

      off(document, "visibilitychange", onVisibility);
    };
  }, [events, ms, state]);

  return state;
};
