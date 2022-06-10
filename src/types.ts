
export type FlowStep = {
  index: number;
  name: string;
  prev: (string | null)[];
  next: (string | null)[];
}

export type FlowSteps = Array<FlowStep>;

export type Transition = {
  response: string;
  step: string;
}

export type Transitions = Array<Transition>;

export type Option = {
  key: string;
  value: string;
}

export type Options = Array<Option>;