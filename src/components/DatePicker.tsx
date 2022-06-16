import React, { FC, useRef } from "react";
import { useFormikContext, FieldHookConfig } from "formik";
import { DatePickerOptions } from "../types";
import DateField from "./DateField"

const DatePicker: FC<DatePickerOptions & FieldHookConfig<string>> = ({
  placeHolders = ["day", "month", "year"],
  value,
  className = "",
  onChange,
  ...props
}) => {

  const { values, errors } = useFormikContext<any>();

  const dayRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="inline-block">
      <div className="flex">
        <DateField
          ref={dayRef}
          style={props.inputStyle}
          placeholder={placeHolders[0]}
          name={"rbday"}
        />
        <DateField
          ref={monthRef}
          style={props.inputStyle}
          placeholder={placeHolders[1]}
          name={"rbmonth"}
        />
        <DateField
          ref={yearRef}
          style={props.inputStyle}
          placeholder={placeHolders[2]}
          name={"rbyear"}
        />
      </div>
      {errors.rbyear ? (
        <span  className="block mt-2 text-sm font-medium text-red-600">{"Please enter a valid date"}</span>
      ) : null}
    </div>
  );
};

export default DatePicker;