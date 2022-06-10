import React, { useEffect } from 'react';
import { useField, FieldHookConfig, Field } from 'formik';

type Option = {
  key: string;
  value: string | number;
}

type Transition = {
  response: string;
  step: string;
}

type OtherProps = {
  label: string;
  options: Array<Option>;
  transitions?: Array<Transition>; 
  setNextStep?: React.Dispatch<React.SetStateAction<string>>;
  getNextStep?: (event: any, transitions: any) => string | undefined;
}

function SelectField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta, helpers] = useField(props);

  const getDefaultNextStep = () => {
    if (props.transitions && props.setNextStep) {
      const step = props.transitions.find((transition: any) => transition.response.toLowerCase() === meta.initialValue);
      step && props.setNextStep(step.step);
    }
  };

  useEffect(() => {
    getDefaultNextStep();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <Field
        as="select"
        className="mt-2"
        {...field}
        onChange={
          (event: any) => {
            helpers.setValue(event.target.value)
            if (props.transitions && props.getNextStep && props.setNextStep) {
              const transition = props.getNextStep(event, props.transitions);
              transition && props.setNextStep(transition);
            }
          }
        }
      >
        {props.options.map((item) => {
          return (
            <option key={item.key} value={item.value}>{item.value}</option>
          )
        })}
      </Field>
    </div>
    
  );
}

export default SelectField;