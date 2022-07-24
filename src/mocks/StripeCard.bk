import React, { useState } from 'react';
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { client } from "../lib/api"
import { FormData } from "../types";
import { useFormikContext } from "formik";

import { Oval } from "react-loader-spinner";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/solid';

const inputStyle = {
  color: "rgb(75 85 99)",
  fontWeight: '500',
  fontSize: '14px',
}

const tailwindStyles = {
  borderWidth: "2px",
  borderColor: "rgb(209 213 219)",
  borderRadius: "0.5rem",
  borderStyle: "solid",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  padding: "0.5rem",
  marginBottom: "0.75rem"
}


export default function StripeCard() {
  const stripe = useStripe();
  const elements = useElements();
  const { setFieldValue } = useFormikContext<FormData>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const errorMsgCard = "There was a problem with your credit card number. Make sure you entered it correctly.";
  const errorMsgGeneric = "Something went wrong. Please try again later.";

  const buttonStyles = "flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3 mt-4 w-80";

  const loaderStyles = "flex justify-center py-2 px-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 mb-3 mt-4 w-80";

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (stripe && elements) {
      setLoading(true);
      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement as StripeCardNumberElement,
      });

      if (!error) {
        const { id } = paymentMethod;
        setFieldValue("paymentMethodId", id);
        const response: any = await client.post("card-details", { id });

        if (response.problem) {
          setLoading(false);
          setErrorMessage(errorMsgCard);
          setError(true);
        } else {
          setFieldValue("stripeCustomerId", response.data.customer.id);
          cardElement?.clear();
          setLoading(false);
          navigate("/phone-number");
        }
      } else {
        console.log("Error:", error);
        setLoading(false);
        setErrorMessage(errorMsgGeneric);
        setError(true);
      }
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full">
        <button className="align-self-start" onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
        </button>
        <form className="flex flex-col justify-between min-h-full" onSubmit={handleSubmit} >
          <div>
            <h1 className="text-3xl font-extrabold mb-4">Credit card info</h1>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
            <div style={tailwindStyles}>
              <CardNumberElement
                options={{
                  style: {
                    base: inputStyle,
                  }
                }}
              />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
            <div style={tailwindStyles}>
              <CardExpiryElement/>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
            <div style={tailwindStyles}>
              <CardCvcElement/>
            </div>
          </div>
          <div>
            {error && (
              <span  className="block mt-2 mb-4 text-sm font-medium text-red-600">
                {errorMessage}
              </span>
            )}
            {loading ? (
              <div className={loaderStyles}>
                <Oval
                  ariaLabel="loading-indicator"
                  height={24}
                  width={24}
                  strokeWidth={4}
                  color="white"
                  secondaryColor="blue"
                />
              </div>
            ): (
              <button className={buttonStyles} disabled={!stripe}>
                Next
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}