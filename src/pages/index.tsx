import React, { useEffect } from 'react'

import { useIdle } from './hooks/useIdle'

export default function Home() {
  const active = useIdle();

  console.log(active);
  useEffect(() => {
  console.log(active);

  }, [active])

  
  
  return (
    <>1
    </>
  )
}
