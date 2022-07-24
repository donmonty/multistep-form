import React from 'react';
import { useField, Field, FieldHookConfig } from 'formik';
import { dateMask } from "./masks";

type OtherProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  mask?: any;
}

function BirthdateField({ ...props }: OtherProps & FieldHookConfig<string>){
  const [field, meta, helpers] = useField(props);

  return (
    <div className="flex flex-col">
      <label className="custom-field">
        <input
          { ...field }
          onChange={(e) => {
            props.mask && props.mask.onChange(e);
            helpers.setValue(e.target.value);
          }}
          placeholder={props.placeholder ? props.placeholder : "DD/MM/YYYY"}
        />
        <span className="placeholder">{props.label}</span>
        {meta.touched && meta.error ? (
        <span  className="block mt-2 text-sm font-medium text-red-600">Please enter a valid date</span>
      ) : null}
      </label>
    </div>
  );
}

export default BirthdateField;
