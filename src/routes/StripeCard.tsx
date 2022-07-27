import React, { useState } from 'react';
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { client } from "../lib/api"
import { FormData } from "../types";
import { useFormikContext } from "formik";

import { Oval } from "react-loader-spinner";
import Header from "../components/Header";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

const inputStyle = {
  color: "black",
  // color: "rgb(75 85 99)",
  fontWeight: '500',
  fontSize: '20px',
}

const tailwindStyles = {
  borderWidth: "2px",
  // borderColor: "rgb(209 213 219)",
  // borderRadius: "0.5rem",
  borderStyle: "solid",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  padding: "0.5rem",
  height: "60px",
  backgroundColor: "#e5e5e5"
  // marginBottom: "0.75rem"
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

  const primaryBtnStyles = "flex mt-2 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-semibold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-figOrange-700 w-full disabled:bg-gray-300 self-center";

  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent shadow-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 mb-3 mt-4 w-full";

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
    <div className="relative bg-figGray-300 h-screen lg:h-screen">
      <Header />
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* White area */}
        <div className="bg-white min-h-[500px] lg:min-w-[630px] lg:max-w-[630px]">
          <div className="flex flex-col py-14 px-10 lg:py-12 lg:px-16">
          <p className="mb-5 font-CapriSans text-figGray-600 lg:text-xl">step 3 of 5</p>
          <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7">Credit card info</h1>

          {/* <p className="md:inline-block pl-2 mb-12 font-CapriSans text-black tracking-widest lg:ml-0">You won't be charged</p> */}

          {/* Form fields */}
          <form className="flex flex-col justify-between min-h-full" onSubmit={handleSubmit} >
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 lg:grid-cols-2 lg:gap-x-2 place-items-stretch">

              <div className="lg:col-span-2 text-base font-Montserrat" style={tailwindStyles}>
                <label className="block text-sm text-figGray-600 mb-1">Card number</label>
                <CardNumberElement
                  options={{
                    style: {
                      base: inputStyle,
                    }
                  }}
                />
              </div>

              <div className="lg:col-span-1 text-base font-Montserrat" style={tailwindStyles}>
                <label className="block text-sm font-medium text-figGray-600 mb-1">Expiration date</label>
                <CardExpiryElement
                  options={{
                    style: {
                      base: inputStyle,
                    }
                  }}
                />
              </div>

              <div className="lg:col-span-1 text-base font-Montserrat" style={tailwindStyles}>
                <label className="block text-sm font-medium text-figGray-600 mb-1">CVC</label>
                <CardCvcElement
                  options={{
                    style: {
                      base: inputStyle,
                    }
                  }}
                />
              </div>

              <div className="lg:col-span-2 pt-6 text-base font-Montserrat text-black">
                <p>All costs associated with Culina Health services are communicated to you first. NO SURPRISES!</p>
              </div>

              <div className="lg:col-span-2 mt-0">
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
                      secondaryColor="#BD240A"
                    />
                  </div>
                ): (
                  <button className={primaryBtnStyles} disabled={!stripe}>
                    NEXT
                  </button>
                )}
              </div>

            </div>
          </form>

          </div>
        </div>

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end credit-card-lg lg:min-h-[640px] lg:min-w-[440px] lg:max-w-[440px]"></div>

      </div>
    </div>
  );
}