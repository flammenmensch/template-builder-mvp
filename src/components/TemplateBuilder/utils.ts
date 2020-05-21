import { Component, Level } from './types';
import shortid from 'shortid';
import { Reducer } from 'react';

export const createNewLevel = (name: string = 'New level'): Level => ({
  id: shortid(),
  label: name,
  levels: [],
  components: [],
});

export const createNewComponent = (): Component => ({
  id: shortid(),
  label: 'Component',
  value: 'Some value',
});

export const reduceReducers = (reducers: Reducer<any, any>[]) => (state: any, action: any) =>
  reducers.reduce((acc, currentReducer) => {
    return currentReducer(acc, action);
  }, state);