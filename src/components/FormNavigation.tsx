import { FormikValues } from "formik";
import React from "react";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const buttonStyles = "flex mr-3 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

function FormNavigation(props: Props) {
  return (
    <div className="flex mt-5">
      {props.hasPrevious && <button type="button" className={buttonStyles} onClick={props.onBackClick}>Back</button>}
      <button className={buttonStyles} type="submit">{props.isLastStep ? "Submit": "Next"}</button>
    </div>
  );
}

export default FormNavigation;