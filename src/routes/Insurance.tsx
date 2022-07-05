import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";

import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Insurance() {
  let navigate = useNavigate();
  let location = useLocation();

  const { setFieldValue } = useFormikContext<FormData>();
  const { loadPageSchema } = useSchemaContext();

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3";

  const providerStyles = "w-32 h-16 rounded-md bg-slate-100 border-gray-300 border-2 mb-2 mr-2 text-center pt-4";

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-3">We partner with insurance</h1>
          <p className="mb-6 text-sm font-bold">Is any of the following your provider?</p>
          <div className="flex flex-wrap mb-8">
            <div className={providerStyles}> Provider 1</div>
            <div className={providerStyles}>Provider 2</div>
            <div className={providerStyles}> Provider 3</div>
            <div className={providerStyles}> Provider 4</div>
            <div className={providerStyles}> Provider 5</div>
            <div className={providerStyles}> Provider 6</div>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className={buttonStyles}
            onClick={() => {
              setFieldValue("hasInsurance", "yes");
              navigate("/policy-info");
            }}
          >
            Yes
          </button>
          <button
            className={buttonStyles}
            onClick={() => {
              setFieldValue("hasInsurance", "no");
              navigate("/credit-card");
            }}
          >
            No
          </button>
        </div>
        
      </div>
    </div>
  );
}