import React, { useEffect } from 'react';
import { useField, FieldHookConfig, Field } from 'formik';

type Option = {
  key: string;
  value: string | number;
}

type OtherProps = {
  label: string;
  options: Array<Option>;
  setNextStep: React.Dispatch<React.SetStateAction<string>>;
  getSelectedOption: (event: any, options: any) => string;
}

function SelectField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);

  const getDefaultNextStep = () => {
    const option = props.options.find((item: any) => item.value.toLowerCase() === meta.initialValue);
    option && props.setNextStep(option.key);
  };

  useEffect(() => {
    getDefaultNextStep();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <Field
        as="select"
        {...field}
        onChange={
          (event: any) => {
            const option = props.getSelectedOption(event, props.options);
            props.setNextStep(option);
          }
        }
      >
        {props.options.map((item) => {
          return (
            <option key={item.key} value={item.value}>{item.value} </option>
          )
        })}
      </Field>
    </div>
    
  );
}

export default SelectField;