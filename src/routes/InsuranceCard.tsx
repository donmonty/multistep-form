import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import useUploadImages from "../lib/useUploadImages"
import { client } from "../lib/api"

import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import ImageUploadField from "../components/FileUploadField";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Oval } from "react-loader-spinner";

export default function InsuranceCard() {
  let navigate = useNavigate();
  let location = useLocation();

  const [cardFrontImage, setCardFrontImage] = React.useState<File | null>(null);
  const [cardBackImage, setCardBackImage] = React.useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = React.useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = React.useState<string | null>(null);
  const [loading, setLoading]  = React.useState(false);

  const customHook = useUploadImages();

  const uploadImages = async () => {
    console.log("Executing uploadImages...");
    if (cardFrontImage && cardBackImage) {
      console.log("Card files OK!");
      setLoading(true);
      // const cardFront = await uploadCardImage(cardFrontImage);
      // const cardBack = await uploadCardImage(cardBackImage);
      const cardFront = "fake-card-front-url";
      const cardBack = "fake-card-back-url";

      if (cardFront && cardBack) {
        console.log("Card images uploaded!");
        setFrontImageUrl(cardFront);
        setBackImageUrl(cardBack);

        customHook.setFieldValue("insuranceCardFront", cardFront);
        // setFieldValue("insuranceCardFront", cardFront);
        setFieldValue("insuranceCardBack", cardBack);

        setLoading(false);
        return true;
      }
      console.log("Couldn't upload card images!");
      setLoading(false);
      return false;
    }
  };
  

  // const {
  //   uploadImages,
  //   cardFrontImage,
  //   setCardFrontImage,
  //   cardBackImage,
  //   setCardBackImage,
  //   frontImageUrl,
  //   backImageUrl,
  //   loading,
  // } = useUploadImages();

  const [imageUploadError, setImageUploadError] = React.useState<string | null>(null);
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/phone-number";

  console.log("values.insuranceCardFront", values.insuranceCardFront);

  // const setButtonStatus =() => {
  //   if (
  //     values.insuranceCardFront === "" ||
  //     values.insuranceCardBack === "" ||
  //     errors.insuranceCardFront ||
  //     errors.insuranceCardBack
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mt-4 mb-3";
  const loaderStyles = "flex justify-center py-2 px-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 mb-3 mt-4 w-80";

  const handleClick = async () => {
    const status = await uploadImages();
    if (status) {
      setImageUploadError(null);
      handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema });
    } else {
      setImageUploadError("There was a problem uploading your images. Please try again.");
    }
  };

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
          <h1 className="text-3xl font-extrabold mb-4">Your insurance card</h1>
          <p className="mb-3 text-sm">Upload the front and the back of your insurance card so your insurance verifies how many free sessions you have covered.</p>
          <ImageUploadField
            label="Front of the card"
            name="insuranceCardFront"
            handleFile={setCardFrontImage}
          />
          <ImageUploadField
            label="Back of the card"
            name="insuranceCardBack"
            handleFile={setCardBackImage}
          />
        </div>

        {imageUploadError && (
          <span className="block mt-2 text-sm font-medium text-red-600">{imageUploadError}</span>
        )}

        <button
          className={buttonStyles}
          onClick={
            async () => {
              const response = await client.get("/s3Url");
              console.log("response.data:", response.data);
            }
          }
        >
          Print Secure URL
        </button>

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
          <button
            className={buttonStyles}
            disabled={loading}
            onClick={() => handleClick()}
          >
            Next
        </button>
        )}

      </div>
    </div>
  );
}