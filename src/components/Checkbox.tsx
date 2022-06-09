import React from 'react';
import { useField, FieldHookConfig, Field } from 'formik';

type OtherProps = {
  // label: string;
  children: any;
}

function Checkbox({ ...props }: OtherProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);

  return (
    <div>
      {/* <label>{props.label}</label> */}
      <input type="checkbox" {...field} />
      {props.children}
    </div>
  );
}

export default Checkbox;