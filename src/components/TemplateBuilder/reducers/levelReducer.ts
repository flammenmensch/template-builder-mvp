import { LevelContainer } from '../types';
import { createNewLevel } from '../utils';

export default <S extends LevelContainer>(prevState: S, action: any): S => {
  switch (action.type) {
    case 'ADD_LEVEL':
      return {
        ...prevState,
        levels: [...prevState.levels, createNewLevel(action.payload)]
      };
    case 'REMOVE_LEVEL':
      return {
        ...prevState,
        levels: prevState.levels.filter(level => level.id !== action.payload.id)
      };
    case 'UPDATE_LEVEL':
      return {
        ...prevState,
        levels: prevState.levels.map((level) => {
          if (level.id === action.payload.id) {
            return {...action.payload};
          }
          return level;
        })
      };
    default:
      return prevState;
  }
};