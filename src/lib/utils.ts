import { FormData, SlotsAPIResponse } from "../types"
import { FormikErrors, FormikTouched } from "formik"
import { NavigateFunction } from "react-router-dom";
import { client } from "./api";
import { dummyDates } from "../mocks/dummyDates";

export type HandleNavProps = {
  nextStep: string;
  validateForm: (values?: any) => Promise<FormikErrors<FormData>>;
  setTouched: (touched: FormikTouched<FormData>, shouldValidate?: boolean | undefined) => void
  navigate: NavigateFunction;
  currentSchema: any;
  submitForm?: (() => Promise<void>) & (() => Promise<any>);
}; 

export async function handleNav({
  nextStep,
  validateForm,
  setTouched,
  navigate,
  currentSchema,
  submitForm,
}: HandleNavProps ) {
  const errors = await validateForm();
  console.log("errors:", errors);
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
    submitForm && await submitForm();
    navigate(nextStep);
  }
}

/**
 * Uploads an image to a secure S3 URL
 * @param file - File object
 * @returns the image url
 */
export async function uploadCardImage(file: File) {

  // Request a secure S3 URL for posting the image
  const response = await client.get("/s3Url");
  
  if (response.problem) {
    console.log("Error in uploadCardImage:", response.problem);
    return null;
  }
  // console.log("s3 response:", response);

  // Post the image to the S3 URL
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

  const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms));
  await delayPromise(delay);

  return dummyDates as SlotsAPIResponse;

  // const response = await client.get("/slots");
  // if (response.problem) {
  //   console.log("Error in getAvailableSlots:", response.problem);
  //   return null;
  // }
  // return response.data as SlotsAPIResponse;
}