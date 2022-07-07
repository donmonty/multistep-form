import { CSSProperties } from "react";

export type FlowStep = {
  index: number;
  name: string;
  prev: (string | null)[];
  next: (string | null)[];
}

export type FlowSteps = Array<FlowStep>;

export type Transition = {
  response: string;
  step: string;
}

export type Transitions = Array<Transition>;

export type TransitionsObject = {
  [key: string]: Transitions;
}

export type Option = {
  key: string;
  value: any;
}

export type Options = Array<Option>;

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  handleChange?: (value: string, name: string) => void;
}

export interface DatePickerOptions {
  placeHolders?: [string, string, string];
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: [string, string, string];
}

export type Slot = {
  practitioner_id: number;
  slots_id: number;
  time: string;
}

export type DateRows = {
  [key: string]: Slot[];
}

export interface FormData {
  isAppointmentForYou: string;
  weightloss: boolean;
  sustainableHabits: boolean;
  lowEnergy: boolean;
  balancedDiet: boolean;
  goals: string[];
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  patientRelationship: string;
  patientFirstName: string;
  patientLastName: string;
  patientBirthDate: string;
  patientEmail: string;
  callDate: string;
  callTime: string;
  practitionerId: string;
  callSlotId: string;
  hasInsurance: string;
  isPolicyHolder: string;
  policyHolderFirstName: string;
  policyHolderLastName: string;
  policyHolderBirthDate: string;
  policyHolderAddress: string;
  policyHolderCity: string;
  policyHolderState: string;
  insuranceCompany: string;
  cardName: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardCvc: string;
  paymentMethodId: string;
  stripeCustomerId: string;
  insuranceCardFront: string;
  insuranceCardBack: string;
  phoneNumber: string;
  aboutUs: string;
}