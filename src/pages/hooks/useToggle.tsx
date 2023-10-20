import React, { Reducer, useReducer } from 'react';

// 跟踪布尔值

const toggleReducer = (state: boolean, nextValue?: any) => 
typeof nextValue === 'boolean' ? nextValue : !state;

export const useToggle = (initialState: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialState);
}
