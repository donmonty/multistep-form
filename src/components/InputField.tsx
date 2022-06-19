import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import "../App.css";

type OtherProps = {
  label: string;
  required?: boolean;
  mask?: any;
}

function InputField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="flex flex-col mb-4" >
      <label className="custom-field">
        <input
          required={props.required ? props.required: false}
          {...field}
          onChange={(e) => {
            props.mask && props.mask.onChange(e);
            helpers.setValue(e.target.value);
          }}
        />
        <span className="placeholder">{props.label}</span>
        {meta.touched && meta.error ? (
        <span  className="block mt-2 text-sm font-medium text-red-600">{meta.error}</span>
      ) : null}

      </label>

      {/* <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <input className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus: outline-none focus:border-indigo-500  focus:ring-1 focus:ring-indigo-500" {...field} />
      {meta.touched && meta.error ? (
        <div className="block mt-2 text-sm font-medium text-red-600">{meta.error}</div>
      ) : null} */}
    </div>
  );
};

export default InputField;