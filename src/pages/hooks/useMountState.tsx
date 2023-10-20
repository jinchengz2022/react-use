import { useCallback, useEffect, useRef } from 'react';

// 判断组件是否已挂载
export const useMountState = (): () => boolean => {
  const mountRef = useRef<boolean>(false);
  const get = useCallback(() => mountRef.current, []);

  useEffect(() => {
    mountRef.current = true;

    return () => {
      mountRef.current = false;
    }
  })

  return get;
}
