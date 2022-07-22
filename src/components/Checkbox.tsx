import React from "react";

import { Field, FieldHookConfig, useField } from "formik";
import { Option } from "../types";
import "../App.css";

type OtherProps = {
  label?: string;
  options: Array<Option>;
}

type CheckboxSingleProps = {
  label: string;
}

export default function Checkbox({ ...props }: OtherProps & FieldHookConfig<string>) {
  return (
    <div className="flex-col mb-8">
      {props.options.map((item: Option, index: number) => (
        <label key={item.key} className="block mb-2">
          <Field className="mr-2" type="checkbox" name={props.name} value={item.value} />
          {`${item.value}`}
        </label>
      ))}
    </div>
  );
}

export function CheckboxSingle({ ...props }: CheckboxSingleProps & FieldHookConfig<string>) {
  const [field] = useField({ name: props.name, type: "checkbox" });
  return (
    <div className="rounded-lg bg-white overflow-hidden lg:border-figGray-400 lg:border-2">
      <label>
        <input {...field} className="mr-2 leading-tight hidden" type="checkbox" />
        <span className="flex items-center justify-center w-full text-figGray-800 font-Montserrat font-semibold leading-4 text-sm px-3 py-4 text-center h-16">
          {props.label}
        </span>
      </label>
    </div>
  );
}

// function Checkbox(props: FieldInputProps<string>) {
//   return (
//     <Field name={props.name}>
//       {({ field, form }: { field: FieldInputProps<string>, form: FormikProps}) => (
//         <label>
//           <input
//             {...field}
//             type="checkbox"
//             checked={field.value.includes(props.value)}
//             onChange={() => {
//               const set = new Set(field.value);
//               if (set.has(props.value)) {
//                 set.delete(props.value);
//               } else {
//                 set.add(props.value);
//               }
//               field.onChange(field.name)(Array.from(set));
//               form.setFieldTouched(field.name, true);
//             }}
//           />
//           {props.value}
//         </label>
//       )}
//     </Field>
//   );
// }