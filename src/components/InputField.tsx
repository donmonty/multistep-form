import React from 'react';
import { useField, FieldHookConfig } from 'formik';

type OtherProps = {
  label: string;
}

function InputField({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col mb-4" >
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <input className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus: outline-none focus:border-indigo-500  focus:ring-1 focus:ring-indigo-500" {...field} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;