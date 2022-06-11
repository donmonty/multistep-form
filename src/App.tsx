import React, { useState } from 'react';
import MultiStepForm from "./components/MultiStepForm"
import { FormStep } from "./components/MultiStepForm"
import InputField from './components/InputField';
import SelectField from "./components/SelectField";
import RadioGroup from './components/RadioGroup';

import useFormUtils from './components/useFormUtils';

import * as Yup from 'yup';
import './App.css';

function App() {
  const insuranceCompanies = [
    { key: "company a", value: "Company A"},
    { key: "company b", value: "Company B"},
    { key: "company c", value: "Company C"},
  ];
  const isPatient = [
    { key: "company", value: "Yes"},
    { key: "patient", value: "No"},
  ];

  const stepFlow = [
    { index: 0, name: "user", prev: [null], next: ["address"] },
    { index: 1, name: "address", prev: ["user"], next: ["patient", "company"] },
    { index: 2, name: "patient", prev: ["address"] , next: ["company"] },
    { index: 3, name: "company", prev: ["patient"] , next: [null] },
  ];

  const transitions = {
    patient: [
      { response: "yes", step: "company" },
      { response: "no", step: "patient" },
    ],
  };

  const initialValues = {
    name: "",
    email: "",
    street: "",
    number: "",
    patient: "yes",
    patientName: "",
    patientStreet: "",
    company: "company a",
  };

  const {
    previous,
    next,
    getNextStep,
    nextStep,
    setNextStep,
    stepNumber,
    snapshot
  } = useFormUtils(stepFlow, transitions.patient, initialValues);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <h1 className="text-center text-2xl font-medium text-gray-700">Multi Step Form</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-96">
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
                email: Yup.string().email().required("Email is required")
              })
            }
          >
            <InputField name="name" label="Name"/>
            <InputField name="email" label="Email"/>
          </FormStep>

          <FormStep
            stepName="Address"
            onSubmit={() => console.log("Step 2")}
            validationSchema={
              Yup.object({
                street: Yup.string().required("Street is required"),
                number: Yup.number().positive().integer().required("Number is required"),
              })
            }
          >
            <InputField name="street" label="Street"/>
            <InputField name="number" label="Number"/>

            <RadioGroup
              name="patient"
              label="Are you the patient?"
              align="horizontal"
              options={isPatient}
              transitions={transitions.patient}
              setNextStep={setNextStep}
              getNextStep={getNextStep}
            />
            
            {/* <SelectField
              name="patient"
              label="Are you the patient?"
              options={isPatient}
              transitions={transitions.patient}
              setNextStep={setNextStep}
              getNextStep={getNextStep}
            /> */}
          </FormStep>
          
          <FormStep
            stepname="Patient"
            onSubmit={() => console.log("Step 3")}
            validationSchema={
              Yup.object({
                patientName: Yup.string().required("Name is required"),
                patientStreet: Yup.string().required("Street is required"),
              })
            }
          >
            <InputField name="patientName" label="Patient name"/>
            <InputField name="patientStreet" label="Street"/>
          </FormStep>

          <FormStep
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
          </FormStep>

        </MultiStepForm>
      </div>
    </div>
  );
}

export default App;
