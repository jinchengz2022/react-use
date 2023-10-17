import React, { useState, useEffect } from "react";

import { off, on, isBrowser } from "./../utils/listen";

// 获取window.location等信息

const patchHistoryMethod = <T extends keyof Window["history"]>(
  method: Window["history"][T]
) => {
  const history = window.history;
  const original = history[method];

  history[method] = function (state: unknown) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;

    window.dispatchEvent(event);

    return result;
  };
};

if (isBrowser) {
  patchHistoryMethod("pushState");
  patchHistoryMethod("replaceState");
}

const useLocationServer = () => ({
  trigger: "load",
  length: 1,
});

const buildState = (trigger: string) => {
  const { state, length } = window.history;

  const {
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
  } = window.location;

  return {
    trigger,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
    state,
    length,
  };
};

const useLocationBrowser = () => {
  const [state, updateState] = useState(buildState("load"));

  useEffect(() => {
    const onPopState = () => updateState(buildState("popstate"));
    const onPushState = () => updateState(buildState("pushstate"));
    const onReplacestate = () => updateState(buildState("replacestate"));

    on(window, "popstate", onPopState);
    on(window, "pushstate", onPushState);
    on(window, "replacestate", onReplacestate);

    return () => {
      off(window, "popstate", onPopState);
      off(window, "pushstate", onPushState);
      off(window, "replacestate", onReplacestate);
    };
  }, []);

  return state;
};

const hasEventConstructor = typeof Event === "function";

export default isBrowser && hasEventConstructor
  ? useLocationBrowser
  : useLocationServer;
