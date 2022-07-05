import { FormData } from "../types"
import { FormikErrors, FormikTouched } from "formik"
import { NavigateFunction } from "react-router-dom";

export type HandleNavProps = {
  nextStep: string;
  validateForm: (values?: any) => Promise<FormikErrors<FormData>>;
  setTouched: (touched: FormikTouched<FormData>, shouldValidate?: boolean | undefined) => void
  navigate: NavigateFunction;
  currentSchema: any;
  submitForm?: (() => Promise<void>) & (() => Promise<any>);
}; 

export async function handleNav({
  nextStep,
  validateForm,
  setTouched,
  navigate,
  currentSchema,
  submitForm,
}: HandleNavProps ) {
  const errors = await validateForm();
  console.log("errors:", errors);
  if (Object.keys(errors).length > 0) {
    let touchedObject: { [field: string]: boolean } = {};
    for (const field in currentSchema.fields) {
      if (errors.hasOwnProperty(field)) {
        const newField = { [field]: true };
        touchedObject = { ...touchedObject, ...newField };
      }
    }
    setTouched(touchedObject);
  } else {
    submitForm && await submitForm();
    navigate(nextStep);
  }
}