export interface LevelContainer {
  levels: Array<Level>;
}

export interface ComponentContainer {
  components: Array<Component>;
}

export interface Template extends LevelContainer {
  id: string;
}

export interface Component {
  id: string;
  label: string;
  value: string;
}

export interface Level extends LevelContainer, ComponentContainer {
  id: string;
  label: string;
}
