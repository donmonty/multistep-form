import React, { useEffect } from 'react';
import { useField, FieldHookConfig, Field } from 'formik';

import { Transition, Option } from "../types";

type OtherProps = {
  label: string;
  options: Array<Option>;
  align: string; // if the radio buttons should align horizontally or vertically
  handleChange?: any; // An optional callback to execute whenever the field value changes
  transitions?: Array<Transition>; // In case the next step to navigate to is determined by the value selected by the user
  setNextStep?: React.Dispatch<React.SetStateAction<string | null>>; // In case the next step to navigate to is determined by the value selected by the user
  getNextStep?: (event: any, transitions: any) => string | undefined; // In case the next step to navigate to is determined by the value selected by the user
}


function RadioGroup({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta, helpers] = useField(props);

  const getDefaultNextStep = () => {
    if (props.transitions && props.setNextStep) {
      const step = props.transitions.find((transition: any) => transition.response.toLowerCase() === meta.initialValue);
      step && props.setNextStep(step.step);
    }
  };

  const style = () => {
    if (props.align === "vertical") {
      return "block mt-3"
    }
    return "mr-6"
  };

  useEffect(() => {
    getDefaultNextStep();
  }, []);

  return (
    <div className="mb-6">
      <div role="group" >
        {props.options.map((item: Option, index: number) => (
          <label key={item.key} className={style()}>
            <Field
              className="mr-2"
              type="radio"
              checked={field.value.toLowerCase().trim() === item.value.toLowerCase().trim()}
              name={props.name}
              value={item.value}
              onClick={
                (event: any) => {
                  helpers.setValue(event.target.value)
                  if (props.handleChange) {
                    props.handleChange(event.target.value);
                  }
                  if (props.transitions && props.getNextStep && props.setNextStep) {
                    const transition = props.getNextStep(event, props.transitions);
                    transition && props.setNextStep(transition);
                  }
                }
              }
            />
            {`${item.value.charAt(0).toLocaleUpperCase()}${item.value.slice(1)}`}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
