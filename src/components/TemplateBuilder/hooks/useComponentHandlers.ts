import React, { Dispatch } from 'react';

export default (dispatch: Dispatch<any>) => {
  const handleAdd = React.useCallback(() => {
    dispatch({ type: 'ADD_COMPONENT' });
  }, []);

  const handleRemove = React.useCallback((removedLevel) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: removedLevel });
  }, []);

  return {
    handleAdd,
    handleRemove,
  };
};