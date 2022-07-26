import { FormData, SlotsAPIResponse } from "../types"
import { FormikErrors, FormikTouched } from "formik"
import { NavigateFunction } from "react-router-dom";
import { client } from "./api";
import { dummyDates } from "../mocks/dummyDates";

export type HandleNavProps = {
  nextStep?: string; // next page to navigate to
  validateForm: (values?: any) => Promise<FormikErrors<FormData>>; // validation function
  setTouched: (touched: FormikTouched<FormData>, shouldValidate?: boolean | undefined) => void // set touched values
  navigate?: NavigateFunction; // navigate function from React Router
  currentSchema: any; // the schema to use for validation in the current page
  submitForm?: (() => Promise<void>) & (() => Promise<any>); // submit function
  validateOnly?: boolean; // if true, only validate, don't submit
}; 

/**
 * When the user clicks the next button, this function is called.
 * It validates the form and then navigates to the next page.
 * It also calls the submitForm function if it exists.
 * @param @see HandleNavProps
 */
export async function handleNav({
  nextStep,
  validateForm,
  setTouched,
  navigate,
  currentSchema,
  submitForm,
  validateOnly
}: HandleNavProps ) {
  const errors = await validateForm();
  console.log("errors:", errors);
  // Check for any errors and mark the fields as touched
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
    if (validateOnly) return true;
    // Calls the submit function if it exists.
    // Check out onSubmit() at App.tsx to see the actual onSumit() function!
    submitForm && await submitForm();
    // Navigate to the next step.
    if (navigate && nextStep) {
      navigate(nextStep);
    }
    
  }
}

/**
 * Uploads an image to a secure S3 URL
 * @param file - File object
 * @returns the image url at the S3 bucket
 */
export async function uploadCardImage(file: File) {

  // Request a secure S3 URL for posting the image
  const response = await client.get("/s3Url");
  
  // The APIsauce library returns a response with a problem property if there is an error
  // No need for try-catch blocks, yay!
  if (response.problem) {
    console.log("Error in uploadCardImage:", response.problem);
    return null;
  }
  // console.log("s3 response:", response);

  // Post the image to the secure S3 URL
  const { url } = response.data as any;
  console.log("url:", url);
  const imagePost = await client.put(
    url as string,
    { file: file },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  if (imagePost.problem) {
    console.log("Error in uploadCardImage:", imagePost.originalError);
    return null;
  }
  console.log("imagePost data:", imagePost.data);

  const imageUrl = url.split('?')[0]

  return imageUrl;
}

/**
 * Loads the available discovery call time slots for the next days
 * @returns An object with the available time slots for the next days
 */
export async function getAvailableSlots(delay = 1000) {


  // This code is just for testing purposes
  // We simulate a call to the Culina API by delaying the response
  const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms));
  await delayPromise(delay);

  return dummyDates as SlotsAPIResponse; // We return the dummy date data

  // ---- The real code starts here ----
  // UNCOMMENT THIS CODE TO CALL THE REAL API
  // const response = await client.get("/slots-api-de-dieguito");
  // if (response.problem) {
  //   console.log("Error in getAvailableSlots:", response.problem);
  //   return null;
  // }
  // return response.data as SlotsAPIResponse;
}