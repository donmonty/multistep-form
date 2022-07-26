import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import useUploadImages from "../lib/useUploadImages"
import { uploadCardImage } from "../lib/utils";
import { client } from "../lib/api"

import { FormData } from "../types";
import Header from "../components/Header";

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

  /**
   * Uploads the front and back card images to a S3 bucket
   * @returns True if successful, false if not
   */
  const uploadImages = async () => {
    console.log("Executing uploadImages...");
    if (cardFrontImage && cardBackImage) { // If both images have been successfully loaded on the image dropzone
      console.log("Card files OK!");
      setLoading(true);
      // const cardFront = await uploadCardImage(cardFrontImage); <-- Uncomment. This gets the real URL of uploaded the image.
      // const cardBack = await uploadCardImage(cardBackImage); <-- Uncomment. This gets the real URL of the uploaded image.
      const cardFront = "fake-card-front-url"; // <-- Comment after testing, this URL is fake
      const cardBack = "fake-card-back-url"; // <-- Comment after testing, this URL is fake

      if (cardFront && cardBack) {
        console.log("Card images uploaded!");
        setFrontImageUrl(cardFront);
        setBackImageUrl(cardBack);

        // customHook.setFieldValue("insuranceCardFront", cardFront);
        setFieldValue("insuranceCardFront", cardFront); // <-- store the URL in the formik state
        setFieldValue("insuranceCardBack", cardBack); // <-- store the URL in the formik state

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  return (
    <div className="relative bg-figGray-300 h-fit lg:h-screen">
      <Header />
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end insurance-card-lg lg:min-h-[640px] lg:min-w-[420px]"></div>

        {/* White area */}
        <div className="bg-white min-h-[500px] max-w-[640px]">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
          <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">step 3 of 5</p>
          <h1 className="text-4xl font-extrabold mb-7">Insurance Information</h1>

          <p className="md:inline-block pl-2 mb-8 font-Montserrat text-sm text-figGray-600 lg:ml-0">Upload a photo of the front and back of your insurance card so we can verify your number of covered sessions.</p>

          {/* Form fields */}
          <div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 place-items-stretch">

              <div className="col-span-1">
                <ImageUploadField
                  label="Upload front of the card"
                  name="insuranceCardFront"
                  handleFile={setCardFrontImage}
                />
              </div>

              <div className="col-span-1">
                <ImageUploadField
                  label="Upload back of the card"
                  name="insuranceCardBack"
                  handleFile={setCardBackImage}
                />
              </div>

              <button
                className={`${buttonStyles} my-0 col-span-1 lg:col-span-2`}
                onClick={
                  async () => {
                    const response = await client.get("/s3Url");
                    console.log("response.data:", response.data);
                  }
                }
              >
                Print Secure S3 URL (for testing only)
              </button>

              {loading ? (
                <div className={`${loaderStyles} col-span-1 lg:col-span-2`}>
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
                  className={`${primaryBtnStyles} mt-0 col-span-1 lg:col-span-2`}
                  disabled={loading}
                  onClick={() => handleClick()}
                >
                  Next
                </button>
              )}

            </div>

            {imageUploadError && (
              <span className="block mt-2 text-sm font-medium text-red-600">{imageUploadError}</span>
            )}

          </div>

          </div>
        </div>

      </div>
    </div>
  );
}