import React, { useState } from 'react';
import MultiStepForm from "./components/MultiStepForm"
import { FormStep } from "./components/MultiStepForm"
import InputField from './components/InputField';
import SelectField from "./components/SelectField";
import RadioGroup from './components/RadioGroup';
import BirthdateField from './components/BirthdateField';

import useFormUtils from './components/useFormUtils';
import { dateMask } from "./components/masks";

import * as dateFns from "date-fns";
import * as Yup from 'yup';
import './App.css';

function App() {

  const [isPolicyHolderVisible, setIsPolicyHolderVisible] = useState(false);

  // -------------------------------------------
  // Options
  // -------------------------------------------
  const insuranceCompanies = [
    { key: "company a", value: "Company A"},
    { key: "company b", value: "Company B"},
    { key: "company c", value: "Company C"},
  ];
  const isPatient = [
    { key: "company", value: "Yes"},
    { key: "patient", value: "No"},
  ];
  const paymentType = [
    { key: "provider", value: "yes" },
    { key: "selfPay", value: "no"}
  ];
  const isPolicyHolder = [
    { key: "yes", value: "yes" },
    { key: "no", value: "no" }
  ];
  const states = [
    { key: "CA", value: "CA" },
    { key: "AZ", value: "AZ" },
    { key: "TX", value: "TX" },
  ];

  const stepFlow = [
    { index: 0, name: "user", prev: [null], next: ["patient", "insurance"] },
    { index: 1, name: "patient", prev: ["user"] , next: ["insurance"] },
    { index: 2, name: "insurance", prev: ["user", "patient"], next: ["policyHolder", "selfPay"] },
    { index: 3, name: "policyHolder", prev: ["insurance"] , next: [null] },
    { index: 4, name: "selfPay", prev: ["insurance"] , next: [null] },
  ];

  const transitions = {
    patient: [
      { response: "yes", step: "insurance" },
      { response: "no", step: "patient" },
    ],
    paymentType: [
      { response: "yes", step: "policyHolder" },
      { response: "selfPay", step: "selfPay" },
    ]
  };

  const policyHolderValidation = {
    isPolicyHolder: Yup.object({
      policyHolderName: Yup.string().notRequired(),
      policyHolderLastName: Yup.string().notRequired(),
      policyHolderDateOfBirth: Yup.string().notRequired(),
      policyHolderAddress: Yup.string().required("Address is required"),
      policyHolderCity: Yup.string().required("City is required"),
      policyHolderState: Yup.string(),
      insuranceCompany: Yup.string(),
    }),

    isNotPolicyHolder: Yup.object({
      policyHolderName: Yup.string().required("Name is required"),
      policyHolderLastName: Yup.string().required("Last name is required"),
      policyHolderDateOfBirth: Yup.string().required("Date of birth is required"),
      policyHolderAddress: Yup.string().required("Address is required"),
      policyHolderCity: Yup.string().required("City is required"),
      policyHolderState: Yup.string(),
      insuranceCompany: Yup.string(),
    })
    
  };

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    street: "",
    number: "",
    birthDate: "",
    dateOfBirth: "",
    patient: "yes",
    patientName: "",
    patientLastName: "",
    patientDateOfBirth: "",
    paymentType: "yes",
    isPolicyHolder: "yes",
    policyHolderName: "",
    policyHolderLastName: "",
    policyHolderAddress: "",
    policyHolderCity: "",
    policyHolderState: "CA",
    insuranceCompany: "company a",
  };

  const {
    previous,
    next,
    getNextStep,
    nextStep,
    setNextStep,
    stepNumber,
    snapshot
  } = useFormUtils(stepFlow, transitions, initialValues);

  const handlePolicyHolderVisible = (value: string) => {
    if (value.toLocaleLowerCase() === "yes") {
      setIsPolicyHolderVisible(false);
    } else {
      setIsPolicyHolderVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      {/* <h1 className="text-center text-2xl font-medium text-gray-700">Multi Step Form</h1> */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full">
        <MultiStepForm
          initialValues={snapshot}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          previous={previous}
          next={next}
          stepNumber={stepNumber}
        >
          <FormStep
            stepName="Personal info"
            onSubmit={() => console.log("Step 1")}
            validationSchema={
              Yup.object({
                name: Yup.string().required("Name is required"),
                lastName: Yup.string().required("Last name is required"),
                email: Yup.string().email().required("Email is required"),
                dateOfBirth: Yup
                  .string()
                  .transform(dateMask.transform)
                  .required()
                  .test("validateDate", "Invalid date", (value) => {
                    return dateFns.isValid(dateFns.parse(value as string, "yyyy-MM-dd", new Date()))
                  })
              })
            }
          >
            <h1 className="text-3xl font-extrabold mb-8">Your details</h1>
            <InputField name="name" label="First name" required={true}/>
            <InputField name="lastName" label="Last name" required={true}/>
            <InputField name="email" label="Email"required={true}/>
            <BirthdateField name="dateOfBirth" label="Date of birth"/>
            <h5 className="mb-4 mt-8 text-base text-gray-400">Is this appointment for you?</h5>
            <RadioGroup
              name="patient"
              label="Are you the patient?"
              align="horizontal"
              options={isPatient}
              transitions={transitions.patient}
              setNextStep={setNextStep}
              getNextStep={(e) => getNextStep(e, "patient")}
            />
          </FormStep>

          <FormStep
            stepname="Patient"
            onSubmit={() => console.log("Patient")}
            validationSchema={
              Yup.object({
                patientName: Yup.string().required("Name is required"),
                patientLastName: Yup.string().required("Last name is required"),
                patientDateOfBirth: Yup
                  .string()
                  .transform(dateMask.transform)
                  .required()
                  .test("validateDate", "Invalid date", (value) => {
                    return dateFns.isValid(dateFns.parse(value as string, "yyyy-MM-dd", new Date()))
                  })
              })
            }
          >
            <h1 className="text-3xl font-extrabold mb-8">Patient details</h1>
            <InputField name="patientName" label="Patient's name" required={true}/>
            <InputField name="patientLastName" label="Patient's last name" required={true}/>
            <BirthdateField name="patientDateOfBirth" label="Patient's date of birth"/>
          </FormStep>

          <FormStep
            stepName="Insurance"
            onSubmit={() => console.log("Insurance")}
            validationSchema={
              Yup.object({})
            }
          >
            <h1 className="text-3xl font-extrabold mb-8">We partner with insurance</h1>
            <RadioGroup
              name="paymentType"
              label="Is any of the above your provider?"
              align="vertical"
              options={paymentType}
              transitions={transitions.paymentType}
              setNextStep={setNextStep}
              getNextStep={(e) => getNextStep(e, "paymentType")}
            />
          </FormStep>

          <FormStep
            stepName="Policy holder"
            onSubmit={() => console.log("Policy holder")}
            validationSchema={
              isPolicyHolderVisible
                ? policyHolderValidation.isNotPolicyHolder
                : policyHolderValidation.isPolicyHolder
            }
          >
            <h1 className="text-3xl font-extrabold mb-8">Your details</h1>
            <h3 className="mb-3">Are you the policy holder?</h3>
            <RadioGroup
              name="isPolicyHolder"
              label="Are you the policy holder?"
              align="horizontal"
              options={isPolicyHolder}
              handleChange={handlePolicyHolderVisible}
            />
            {isPolicyHolderVisible ? (
              <>
                <InputField
                  name="policyHolderName"
                  label="Policy holder's name"
                  required={true}
                />
                <InputField
                  name="policyHolderLastName"
                  label="Policy holder's last name"
                  required={true}
                />
                <BirthdateField name="policyHolderDateOfBirth" label="Policy holder's DOB"/>
              </>
            ) : null}
            <InputField
              name="policyHolderAddress"
              label={isPolicyHolderVisible ? "Policy holder's address" : "Address"}
              required={true}
            />
            <InputField
              name="policyHolderCity"
              label="City"
              required={true}
            />
            <SelectField
              name="policyHolderState"
              label="State"
              options={states}
            />
            <SelectField
              name="insuranceCompany"
              label="Insurance company"
              options={insuranceCompanies}
            />
          </FormStep>

          {/* <FormStep
            stepName="Company"
            onSubmit={() => console.log("Step 4")}
            validationSchema={
              Yup.object({
                company: Yup.string().required()
              })
            }
          >
            <SelectField
              name="company"
              label="Company"
              options={insuranceCompanies}
            />
          </FormStep> */}

        </MultiStepForm>
      </div>
    </div>
  );
}

export default App;
