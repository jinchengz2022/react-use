import React, { useRef, useEffect } from 'react'

// 保留上一次状态
export const usePrevious = (state: unknown) => {
  const ref = useRef<unknown>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
