import { ComponentContainer } from '../types';
import { createNewComponent } from '../utils';

export default <S extends ComponentContainer>(prevState: S, action: any): S => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...prevState,
        components: [...prevState.components, createNewComponent()]
      }
    case 'REMOVE_COMPONENT':
      return {
        ...prevState,
        components: prevState.components.filter(component => component.id !== action.payload.id)
      }
    default:
      return prevState;
  }
};