import React, { Reducer, useReducer } from 'react';
import equal from 'fast-deep-equal';
import LevelComponent from './LevelComponent';
import { Template } from './types';
import useLevelHandlers from './hooks/useLevelHandlers';

import './TemplateBuilder.css';
import levelReducer from './reducers/levelReducer';

interface Props {
  template: Template
  onChange?: (template: Template) => void;
}

const TemplateBuilder = (props: Props) => {
  const { onChange } = props;

  const [state, dispatch] = useReducer<Reducer<Template, any>>(levelReducer, props.template);

  const {handleAdd, handleRemove, handleUpdate} = useLevelHandlers(dispatch);

  React.useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state, onChange]);

  return (
    <ul className="level-list">
      {state.levels.map((level) =>
        <li key={level.id}>
          <LevelComponent
            level={level}
            onChange={handleUpdate}
            onRequestRemove={handleRemove}
          />
        </li>
      )}
      <div>
        <button type="button" onClick={handleAdd}>Add level</button>
      </div>
    </ul>
  );
}

export default React.memo(TemplateBuilder, (prev, next) => equal(prev.template, next.template));