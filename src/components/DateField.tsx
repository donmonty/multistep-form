import React from "react";
import { useField, useFormikContext, FieldHookConfig } from "formik";

import styles from "./input.module.css";
import "../App.css";
import { InputProps } from "../types";

const Input = React.forwardRef<HTMLInputElement, InputProps & FieldHookConfig<string>>(
  ({ style, ...props }, ref) => {

    const [field] = useField(props);
    const { setFieldValue } = useFormikContext();

    return (
      <label className="custom-field">
        <input
          value={field.value}
          onChange={(e) => {
            setFieldValue(field.name, e.target.value);
          }}
          type="number"
          ref={ref}
          className="text-center"
          style={style}
          {...props}
        />
      </label>
    );
  }
);

export default Input;