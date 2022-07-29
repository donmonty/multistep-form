import React, { useEffect, useState } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { uploadCardImage } from "../lib/utils";
import { client } from "../lib/api"

import { FormData } from "../types";
import Header from "../components/Header";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import RadioGroup from "../components/RadioGroup";
import InputField from "../components/InputField";
import ImageUploadField from "../components/FileUploadField";
import { Oval } from "react-loader-spinner";
import BirthdateField from "../components/BirthdateField";
import { dateOfBirthMask } from "../components/masks";
import SelectFieldCustom from "../components/SelectFieldCustom";
import { handleNav } from "../lib/utils";

export default function PolicyInfo() {
  let navigate = useNavigate();
  let location = useLocation();

  const [cardFrontImage, setCardFrontImage] = React.useState<File | null>(null);
  const [cardBackImage, setCardBackImage] = React.useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = React.useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = React.useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = React.useState<string | null>(null);
  const [loading, setLoading]  = React.useState<boolean>(false);

  const [isPolicyHolderVisible, setIsPolicyHolderVisible] = useState(false);

  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const isPolicyHolder = [
    { key: "yes", value: "Yes" },
    { key: "no", value: "No" },
  ];
  const states = [
    { key: "CA", value: "CA" },
    { key: "AZ", value: "AZ" },
    { key: "TX", value: "TX" },
  ];

  const nextStep = "/phone-number";

  const handlePolicyHolderVisible = (e: any) => {
    const value = e.target.value;
    if (value.toLowerCase() === "yes") {
      setIsPolicyHolderVisible(false);
    } else {
      setIsPolicyHolderVisible(true);
    }
    setFieldValue("isPolicyHolder", value.toLowerCase());
  };

  /**
   * Uploads the front and back card images to a S3 bucket
   * @returns True if successful, false if not
   */
   const uploadImages = async () => {
    console.log("Executing uploadImages...");
    if (cardFrontImage && cardBackImage) { // If both images have been successfully loaded on the image dropzone, continue
      console.log("Card files OK!");

      // const cardFront = await uploadCardImage(cardFrontImage); <-- Uncomment. This gets the real URL of uploaded the image.
      // const cardBack = await uploadCardImage(cardBackImage); <-- Uncomment. This gets the real URL of the uploaded image.
      // IMPORTANT!!!: Alternatively, the two above calls can be sent to a third party API that returns the URL of the stored image.

      // For testing purposes only, we will set fake URLs in the meantime:
      const cardFront = "https://fake-card-front-url"; // <-- Comment after testing, this URL is fake
      const cardBack = "https://fake-card-back-url"; // <-- Comment after testing, this URL is fake

      if (cardFront && cardBack) {
        console.log("Card images uploaded sucessfully!");
        setFrontImageUrl(cardFront);
        setBackImageUrl(cardBack);

        // customHook.setFieldValue("insuranceCardFront", cardFront);
        setFieldValue("insuranceCardFront", cardFront); // <-- store the URL in the formik state
        setFieldValue("insuranceCardBack", cardBack); // <-- store the URL in the formik state

        setLoading(false);
        return true;
      }
      console.log("Couldn't upload card images!");
      return false;
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const status = await uploadImages();
    if (status) {
      setImageUploadError(null);
      handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema });
    } else {
      setImageUploadError("There was a problem uploading your images. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageSchema(location.pathname, values.isPolicyHolder.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.isPolicyHolder]);

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-semibold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent shadow-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 mb-3 mt-4 w-full";

  return (
    <div className="relative bg-figGray-300 h-fit lg:h-fit">
      <Header />
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-3 px-2 md:mt-4 lg:px-8 lg:pb-10 lg:flex-row lg:justify-center">

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end insurance-card-lg lg:min-h-[640px] lg:min-w-[420px]"></div>

        {/* White area */}
        <div className="bg-white min-h-[500px] lg:min-w-[680px] lg:max-w-[680px]">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-20">
          <p className="mb-5 font-CapriSans text-figGray-600 lg:text-xl">step 5 of 5</p>
          <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7">Insurance Information</h1>

          {!loading && (
            <>
              <p className="md:inline-block mb-4 font-CapriSans text-black tracking-wider lg:ml-0">Are you the policy holder?</p>
              <RadioGroup
                name="isPolicyHolder"
                label="Are you the policy holder?"
                align="horizontal"
                options={isPolicyHolder}
                handleChange={handlePolicyHolderVisible}
              />
            </>
          )}

          {/* Form fields */}
          <div>

            {isPolicyHolderVisible ? (
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 lg:grid-cols-8 lg:gap-x-2 place-items-stretch">

                <div className="xs:hidden md:block w-full pb-2 mb-2 border-b border-figGray-300 lg:col-span-8">
                  <p className="xs:hidden md:block text-xl font-bold font-Montserrat">About the Policy Holder</p>
                </div>

                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderFirstName"
                    label="Policy holder's first name"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderLastName"
                    label="Policy holder's last name"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-3">
                  <BirthdateField
                    name="policyHolderBirthDate"
                    label="Policy holder's DOB"
                    mask={dateOfBirthMask}
                  />
                </div>
                <div className="lg:col-span-5">
                  <InputField
                    name="policyHolderAddress"
                    label="Policy holder's address"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderCity"
                    label="City"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-2">
                  <SelectFieldCustom
                    name="policyHolderState"
                    label="State"
                    options={states}
                  />
                </div>
                <div className="lg:col-span-2">
                  <InputField
                    name="policyHolderZip"
                    label="Zip"
                    required={true}
                  />
                </div>

                
                {loading ? (
                  <div className="lg:col-span-4 animate-pulse flex justify-center items-center w-full h-40 bg-figBlue-900 text-white rounded-lg text-center font-Montserrat">
                    <span>Uploading image...</span>
                  </div>
                ): (
                  <div className="lg:col-span-4 mt-2">
                    <ImageUploadField
                      label="Upload front of the card"
                      name="insuranceCardFront"
                      handleFile={setCardFrontImage}
                    />
                  </div>
                )}
                
                {loading ? (
                  <div className="lg:col-span-4 animate-pulse flex justify-center items-center w-full h-40 bg-figBlue-900 text-white rounded-lg text-center font-Montserrat">
                    <span>Uploading image...</span>
                  </div>
                ): (
                  <div className="lg:col-span-4">
                    <ImageUploadField
                      label="Upload back of the card"
                      name="insuranceCardBack"
                      handleFile={setCardBackImage}
                    />
                  </div>
                )}

              </div>
            ): (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-2 place-items-stretch">
                <div>
                  {loading ? (
                    <div className="animate-pulse flex justify-center items-center w-full h-40 bg-figBlue-900 text-white rounded-lg text-center font-Montserrat">
                      <span>Uploading image...</span>
                    </div>
                  ): (
                    <ImageUploadField
                      label="Upload front of the card"
                      name="insuranceCardFront"
                      handleFile={setCardFrontImage}
                    />
                  )}
                </div>

                <div>
                  {loading ? (
                    <div className="animate-pulse flex justify-center items-center w-full h-40 bg-figBlue-900 text-white rounded-lg text-center font-Montserrat">
                      <span>Uploading image...</span>
                    </div>
                  ): (
                    <ImageUploadField
                      label="Upload front of the card"
                      name="insuranceCardBack"
                      handleFile={setCardBackImage}
                    />
                  )}
                </div>

              </div>
            )}

            {loading ? (
              <div className={`${loaderStyles} col-span-1 lg:col-span-2`}>
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
              <button
                className={`${primaryBtnStyles} lg:mt-12 lg:mb-16`}
                disabled={loading}
                onClick={() => handleClick()}
              >
                NEXT
              </button>
            )}

          </div>

          </div>
        </div>

      </div>
    </div>
  );
}