import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";

import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import InputField from "../components/InputField";
import { cardNumberMask, cvcMask, monthYearMask } from "../components/masks";
import BirthdateField from "../components/BirthdateField";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export default function CreditCard() {
  let navigate = useNavigate();
  let location = useLocation();

  const { values, errors, setFieldValue } = useFormikContext<FormData>();
  const { loadPageSchema } = useSchemaContext();

  const setButtonStatus = () => {
    if (
      values.cardName === "" ||
      values.cardNumber === "" ||
      values.cardExpirationDate === "" ||
      values.cardCvc === "" ||
      errors.cardName ||
      errors.cardNumber ||
      errors.cardCvc ||
      errors.cardExpirationDate
    ) {
      return true;
    }
    return false;
  };

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3";

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-4">Credit card info</h1>
          <InputField
            name="cardName"
            label="Name on the card"
            required={true}
          />
          <InputField
            name="cardNumber"
            label="Number on the card"
            required={true}
            mask={cardNumberMask}
          />
          <BirthdateField
            name="cardExpirationDate"
            label="Exp date"
            placeholder="MM/YY"
            mask={monthYearMask}  
          />
          <InputField
            name="cardCvc"
            label="CVC"
            required={true}
            mask={cvcMask}
          />
          <p className="mb-3 text-sm">Keep in mind that there is no cost for discovery calls. If there is any charge it will be notified to you first.</p>
        </div>
        <button
          className={buttonStyles}
          disabled={setButtonStatus()}
          onClick={() => {
            navigate("/phone-number");
          }}
        >
          Next
      </button>
      </div>
    </div>
  );
}