import React, { Dispatch } from 'react';

export default (dispatch: Dispatch<any>) => {
  const handleAdd = React.useCallback(() => {
    dispatch({ type: 'ADD_LEVEL' });
  }, []);

  const handleRemove = React.useCallback((removedLevel) => {
    dispatch({ type: 'REMOVE_LEVEL', payload: removedLevel });
  }, []);

  const handleUpdate = React.useCallback((updatedLevel) => {
    dispatch({ type: 'UPDATE_LEVEL', payload: updatedLevel });
  }, []);

  return {
    handleAdd,
    handleRemove,
    handleUpdate,
  };
};