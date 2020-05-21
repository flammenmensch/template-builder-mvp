import React, { useReducer } from 'react';
import equal from 'fast-deep-equal';
import { Component, Level } from './types';
import useLevelHandlers from './hooks/useLevelHandlers';
import useComponentHandlers from './hooks/useComponentHandlers';
import { reduceReducers } from './utils';
import levelReducer from './reducers/levelReducer';
import componentReducer from './reducers/componentReducer';

interface LevelComponentProps {
  level: Level;
  canAddLevels?: boolean;
  canAddComponents?: boolean;
  onChange?: (data: Level) => void;
  onRequestRemove?: (data: Level) => void;
}

interface ComponentComponentProps {
  component: Component;
  onRequestRemove?: (data: Component) => void;
}

const ComponentComponent = (props: ComponentComponentProps) => {
  const {component, onRequestRemove} = props;

  const handleSelfRemove = React.useCallback(() => {
    if (onRequestRemove) {
      onRequestRemove(component);
    }
  }, [component, onRequestRemove]);

  return (
    <div className="level-component">
      {component.label} - {component.value}
      <button type="button" onClick={handleSelfRemove}>Remove</button>
    </div>
  )
}

const reducer = reduceReducers([levelReducer, componentReducer]);

const LevelComponent = (props: LevelComponentProps) => {
  const {onChange, onRequestRemove} = props;

  const [state, dispatch] = useReducer(reducer, props.level);

  const levelHandlers = useLevelHandlers(dispatch);

  const componentHandlers = useComponentHandlers(dispatch);

  const handleSelfRemove = React.useCallback(() => {
    if (onRequestRemove) {
      onRequestRemove(state);
    }
  }, [state, onRequestRemove]);

  React.useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state, onChange]);

  return (
    <React.Fragment>
      <div className="level">
        {state.label} <code>{state.id}</code>
        <button type="button" onClick={handleSelfRemove}>Remove</button>
        <ul className="component-list">
          {props.level.components.map((component) => (
            <li key={component.id}>
              <ComponentComponent component={component} onRequestRemove={componentHandlers.handleRemove} />
            </li>
          ))}
        </ul>
        {props.canAddComponents && (
          <div className="level__controls">
            <button type="button" onClick={componentHandlers.handleAdd}>Add component</button>
          </div>
        )}
      </div>
      <ul className="level-list level-list--sublevel">
        {state.levels.map((level: Level) =>
          <li key={level.id}>
            <LevelComponent
              level={level}
              canAddLevels={false}
              onChange={levelHandlers.handleUpdate}
              onRequestRemove={levelHandlers.handleRemove}
            />
          </li>
        )}
      </ul>
      {props.canAddLevels && (
        <button type="button" onClick={levelHandlers.handleAdd}>Add sublevel</button>
      )}
    </React.Fragment>
  );
};

LevelComponent.defaultProps = {
  canAddLevels: true,
  canAddComponents: true,
}

export default React.memo(LevelComponent, (prev, next) => equal(prev.level, next.level));