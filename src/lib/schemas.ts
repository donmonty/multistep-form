import * as Yup from 'yup';
import moment from "moment";
import valid from "card-validator";

import {
  dateMask,
  expirationDateMask,
  monthYearMask,
  cvcMask,
  cardNumberMask,
  dateOfBirthMask,
  phoneMask,
} from "../components/masks";

export const initialValues = {
  // Appointment details
  isAppointmentForYou: "me",
  reasonForVisit: "healthy eating",
  // Your details
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  street: "",
  city: "",
  state:"AL",
  zipcode: "",
  // Patient details
  patientFirstName: "",
  patientLastName: "",
  patientBirthDate: "",
  patientEmail: "",
  patientRelationship: "dependant",
  // Call details
  callDate: "",
  callTime: "",
  practitionerId: "",
  callSlotId: "",
  // Insurance provider
  hasInsurance: "yes",
  // Insurance Information
  isPolicyHolder: "yes",
  policyHolderFirstName: "",
  policyHolderLastName: "",
  policyHolderBirthDate: "",
  policyHolderAddress: "",
  policyHolderCity: "",
  policyHolderState: "AL",
  policyHolderZip: "",
  insuranceCardFront: "",
  insuranceCardBack: "",
  // Credit card info (Stripe info)
  paymentMethodId: "",
  stripeCustomerId: "",
  // Phone number
  phoneNumber: "",
  aboutUs: "social media",
  // Confirmation code
  confirmationCode: "",
};

export const reasonsSchema = Yup.object({
  healthyEating: Yup.boolean(),
  weightManagement: Yup.boolean(),
  heartHealth: Yup.boolean(),
  hormonalDisorders: Yup.boolean(),
  diabetes: Yup.boolean(),
  fertilityNutrition: Yup.boolean(),
  sportsNutrition: Yup.boolean(),
  foodAllergies: Yup.boolean(),
  relationshipFood: Yup.boolean(),
  oncology: Yup.boolean(),
  gutLiverKidney: Yup.boolean(),
  otherReason: Yup.boolean(),
  reasonSelection: Yup.string().when([
    "healthyEating",
    "weightManagement",
    "heartHealth",
    "hormonalDisorders",
    "diabetes",
    "fertilityNutrition",
    "sportsNutrition",
    "foodAllergies",
    "relationshipFood",
    "oncology",
    "gutLiverKidney",
    "otherReason",
  ], {
    is: (
      healthyEating: boolean,
      weightManagement: boolean,
      heartHealth: boolean,
      hormonalDisorders: boolean,
      diabetes: boolean,
      fertilityNutrition: boolean,
      sportsNutrition: boolean,
      foodAllergies: boolean,
      relationshipFood: boolean,
      oncology: boolean,
      gutLiverKidney: boolean,
      otherReason: boolean,
    ) => {
      return (
        !healthyEating &&
        !weightManagement &&
        !heartHealth &&
        !hormonalDisorders &&
        !diabetes &&
        !fertilityNutrition &&
        !sportsNutrition &&
        !foodAllergies &&
        !relationshipFood &&
        !oncology &&
        !gutLiverKidney &&
        !otherReason 
      )
    },
    then: Yup.string().required("Please select a reason"),
    otherwise: Yup.string().notRequired(),
  })
});

export const appointmentSchema01 = Yup.object({
  // isAppointmentForYou: Yup.string().required("Please select an option"),
  weightloss: Yup.boolean(),
  sustainableHabits: Yup.boolean(),
  lowEnergy: Yup.boolean(),
  balancedDiet: Yup.boolean(),
  goalSelection: Yup.string().when(["weightloss", "sustainableHabits", "lowEnergy", "balancedDiet"], {
    is: (weightloss: boolean, sustainableHabits: boolean, lowEnergy: boolean, balancedDiet: boolean) => {
      return (
        weightloss === false &&
        sustainableHabits === false &&
        lowEnergy === false &&
        balancedDiet === false
      )
    },
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired()
  }) 
})

export const appointmentSchema = Yup.object({
  isAppointmentForYou: Yup.string().required(),
  reasonForVisit: Yup.string().required(),
});

const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
export const userSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  birthDate: Yup.string()
    .test("validateDate", "Invalid date", (value) => {
      const date = moment(value, "DD-MM-YYYY");
      if (date.isValid()) {
        const today = moment();
        const difference = today.diff(date, "years");
        console.log("difference:", difference);
        return difference >= 120 ? false : true
      }
      return false;
  }),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.string().matches(isValidZip, "Invalid zip code").required("Zip code is required"),
});

export const patientSchema = Yup.object({
  patientFirstName: Yup.string().required("First name is required"),
  patientLastName: Yup.string().required("Last name is required"),
  patientEmail: Yup.string().email().notRequired(),
  patientBirthDate: Yup.string()
    .test("validateDate", "Invalid date", (value) => {
      const date = moment(value, "DD-MM-YYYY");
      if (date.isValid()) {
        const today = moment();
        const difference = today.diff(date, "years");
        return difference >= 120 ? false : true
      }
      return false;
  }),
  patientRelationship: Yup.string().required("Relationship is required"),
});

export const callDetailsSchema = Yup.object({
  callDate: Yup.string().required(),
  callTime: Yup.string().required(),
  practitionerId: Yup.string().required(),
  callSlotId: Yup.string().required(),
});

export const insuranceSchema = Yup.object({
  hasInsurance: Yup.string().required("Please select an option"),
});

export const policyInfoSchema = Yup.object({
  isPolicyHolder: Yup.string().required("Please select an option"),
  policyHolderFirstName: Yup.string().required("Name is required"),
  policyHolderLastName: Yup.string().required("Last name is required"),
  policyHolderBirthDate: Yup.string()
    .test("validateDate", "Invalid date", (value) => {
      const date = moment(value, "DD-MM-YYYY");
      if (date.isValid()) {
        const today = moment();
        const difference = today.diff(date, "years");
        console.log("difference:", difference);
        return difference >= 120 ? false : true
      }
      return false;
  }),
  policyHolderAddress: Yup.string().required("Address is required"),
  policyHolderCity: Yup.string().required("City is required"),
  policyHolderState: Yup.string(),
  policyHolderZip: Yup.string().matches(isValidZip, "Invalid zip code").required("Zip code is required"),
  insuranceCardFront: Yup.string().required("Insurance card front is required"),
  insuranceCardBack: Yup.string().required("Insurance card back is required"),
});

export const policyInfoSchema01 = Yup.object({
  isPolicyHolder: Yup.string().required("Please select an option"),
  insuranceCardFront: Yup.string().required("Insurance card front is required"),
  insuranceCardBack: Yup.string().required("Insurance card back is required"),
});

export const creditCardSchema = Yup.object({
  cardHolder: Yup.string().max(255).required("Name on card is required"),
  cardNumber: Yup.string()
    .transform(cardNumberMask.transform)
    .test(
      "test-number",
      "Credit card number is invalid",
      (value) => valid.number(value).isValid
    ),
  cardExpirationDate: Yup.string()
    .transform(monthYearMask.transform)
    .required()
    .test("validateDate", "Invalid date", (value) => {
      return valid.expirationDate(value).isValid
    }),
  cardCVC: Yup.string()
    .transform(cvcMask.transform)
    .required()
    .test("validateCvc", "Invalid CVC", (value) => {
      return valid.cvv(value).isValid
    })
});

export const insuranceCardSchema = Yup.object({
  insuranceCardFront: Yup.string().required("Insurance card front is required"),
  insuranceCardBack: Yup.string().required("Insurance card back is required"),
});

export const phoneNumberSchema = Yup.object({
  phoneNumber: Yup.string()
    .transform(phoneMask.transform)
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  aboutUs: Yup.string().required("Please select an option"),
});

export const confirmationCodeSchema = Yup.object({
  confirmationCode: Yup.string().required("Confirmation code is required"),
});