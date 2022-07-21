import React from "react";

import { uploadCardImage } from "./utils";
import { useFormikContext } from "formik";
import { FormData } from "../types";

/**
 * Custom hook to upload the insurance card images to S3
 * @returns
 * uploadImages: () => Promise<void> --> Uploads the images to S3
 * cardFrontImage: File --> the file object for the front of the card
 * cardBackImage: File --> the file object for the back of the card
 * frontImageUrl: string --> the url for the front of the card
 * backImageUrl: string --> the url for the back of the card
 * loading: boolean --> whether the images are being uploaded
 */
export default function useUploadImages() {
  const [cardFrontImage, setCardFrontImage] = React.useState<File | null>(null);
  const [cardBackImage, setCardBackImage] = React.useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = React.useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = React.useState<string | null>(null);
  const [loading, setLoading]  = React.useState(false);

  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();

  const uploadImages = async () => {
    console.log("Executing uploadImages...");
    if (cardFrontImage && cardBackImage) {
      console.log("Card files OK!");
      setLoading(true);
      // const cardFront = await uploadCardImage(cardFrontImage);
      // const cardBack = await uploadCardImage(cardBacktImage);
      const cardFront = "fake-card-front-url";
      const cardBack = "fake-card-back-url";

      if (cardFront && cardBack) {
        console.log("Card images uploaded!");
        setFrontImageUrl(cardFront);
        setBackImageUrl(cardBack);
        // setLoading(false);
        return true;
      }
      console.log("Couldn't upload card images!");
      setLoading(false);
      return false;
    }
  };

  return {
    uploadImages,
    cardFrontImage,
    setCardFrontImage,
    cardBackImage,
    setCardBackImage,
    frontImageUrl,
    backImageUrl,
    loading,
    setFieldValue,
  };
}