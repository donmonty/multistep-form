import React, { useEffect } from 'react';
import { useField, FieldHookConfig, Field } from 'formik';
import "../App.css";

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
  transitions?: Array<Transition>; // In case the next step to navigate to is determined by the value selected by the user
  setNextStep?: React.Dispatch<React.SetStateAction<string>>; // In case the next step to navigate to is determined by the value selected by the user
  getNextStep?: (event: any, transitions: any) => string | undefined; // In case the next step to navigate to is determined by the value selected by the user
}

function SelectField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta, helpers] = useField(props);

  /**
   * If the next step is determined by the Select field's options, this function gets the default next step
   * to navigate to. This step is the default value in the <Select/> element, provided by its first option.
   */
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
    <div className="mb-0">

      <label className="custom-select">
        <select
          className="text-base font-Montserrat pt-8 pb-4 text-black"
          // disabled={disabled}
          // defaultValue={props.options[0].value}
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
        </select>
        <span className="placeholder">{props.label}</span>
        <span  className="block mt-2 text-sm font-medium text-red-600">{meta.error}</span>
      </label>


      {/* <Field
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
      </Field> */}

    </div>
    
  );
}

export default SelectField;