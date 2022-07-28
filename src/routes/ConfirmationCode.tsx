import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { client } from "../lib/api";
import { FormData } from "../types";
import { Oval } from "react-loader-spinner";
import Header from "../components/Header";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import InputField from "../components/InputField";


export default function ConfirmationCode() {

  const [codeError, setCodeError] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { validateForm, setTouched, submitForm, values } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/booked";

  const handleSubmission = async () => {
    await handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema, submitForm });
    // await submitForm();
    // navigate("/confirmation");
  };

  // const setButtonStatus = () => {
  //   if (values.phoneNumber === "" || errors.phoneNumber) {
  //     return true;
  //   }
  //   return false;
  // };

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent shadow-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 mb-3 mt-4 w-full";

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handles the submission of the confirmation code
   */
  const handleConfirmationCode = async () => {
    setLoading(true);
    setCodeError(false);
    setServerError(true);
    // First, we validate the form to see if there are any errors.
    const proceed = await handleNav({ validateForm, setTouched, currentSchema, validateOnly: true });
    // If there are validation errors, return
    if (!proceed) {
      setLoading(false);
      return;
    }
    // If there are no validation errors, call the API to get the confirmation code.
    const response = await client.post("/confirmation-code", { data: values.confirmationCode }); // <-- dummy API url for testing

    if (response.data as any) {
      const data: any = response.data;
      // If we get a successful response, navigate to the next step.
      if (data.data.success as string === "OK") {
        await handleNav({nextStep, validateForm, setTouched, navigate, currentSchema });
      } else {
        // If we get an error, set the error code to true.
        setCodeError(true);
        setLoading(false);
      }
    } else {
      // If we get here, something went wrong with the API
      setServerError(true);
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-figGray-300 h-screen lg:h-screen">
      <Header/>
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* Image container */}
        {/* <div className="lg:flex lg:flex-col lg:justify-end woman-phone-lg lg:min-h-[640px] lg:min-w-[525px]"></div> */}

        {/* White area */}
        <div className="bg-white lg:mt-16 lg:mb-16 min-h-[500px] lg:min-w-[630px] lg:max-w-[630px]">
          <div className="flex flex-col py-20 px-10 lg:py-12 lg:px-20">
            <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">Lastly!</p>
            <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7">Your confirmation code.</h1>
            <p className="md:inline-block pl-2 mb-8 font-Montserrat text-sm text-figGray-600 lg:ml-0">Please enter the confirmation code we sent to your phone in order to confirm it's you.</p>

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 lg:gap-x-2 place-items-stretch">

              <InputField
                name="confirmationCode"
                label="Confirmation code"
                required={true}
              />
              {codeError && (
                <span  className="block mt-2 text-sm font-medium text-red-600">
                  Please check you entered your confirmation code correctly.
                </span>
              )}
              {serverError && (
                <span  className="block mt-2 text-sm font-medium text-red-600">
                  Something went wrong. Please try again.
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
                    <p className="ml-4 font-semibold">SENDING CODE...</p>
                  </div>
                ): (    
                  <button
                    className={`${primaryBtnStyles} mt-0 xs:mb-12 lg:my-0`}
                    onClick={() => {
                      handleConfirmationCode();
                      // handleSubmission();
                      // navigate("/session-booked");
                    }}
                  >
                    SUBMIT CODE
                  </button>
                )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}