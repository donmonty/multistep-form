import { HTMLInputTypeAttribute } from "react";
import { CSSProperties } from "react";


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

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  handleChange?: (value: string, name: string) => void;
}

export interface DatePickerOptions {
  placeHolders?: [string, string, string];
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: [string, string, string];
}