import React, { useEffect } from 'react'

const useOnce = (fn: () => void) => {
  useEffect(fn, [])
};

export default useOnce;