import { useRef } from 'react';
import useOnce from './useOnce';

export const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useOnce(() => () => fnRef.current());
}