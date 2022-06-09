import React, { useRef, useState } from 'react';
import MultiStepForm from "./components/MultiStepForm"
import { FormStep } from "./components/MultiStepForm"
import InputField from './components/InputField';
import SelectField from "./components/SelectField";
// import Checkbox from "./components/Checkbox";

import * as Yup from 'yup';
import './App.css';

function App() {
  // const [nextStep, setNextStep] = useState("");
  const insuranceCompanies = [
    { key: "company", value: "Company A"},
    { key: "company", value: "Company B"},
    { key: "company", value: "Company C"},
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

  const [nextStep, setNextStep] = useState(stepFlow[1].name);
  console.log("nextStep:", nextStep);

  const getNextStep = (event: any, transitions: any) => {
    const value = event.target.value;
    const step = transitions.find((item: any) => item.response === value);
    return step.step;
  };

  const getSelectedOption = (event: any, options: any) => {
    const value = event.target.value;
    console.log("value:", value);
    const option = options.find((item: any) => item.value === value);
    console.log("option:",option);
    return option.key;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <h1 className="text-center text-2xl font-medium text-gray-700">Multi Step Form</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-96">
        <MultiStepForm
          initialValues={{
            name: "",
            email: "",
            street: "",
            number: "",
            patient: "yes",
            company: "",
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          stepFlow={stepFlow}
          nextStep={nextStep}
          setNextStep={setNextStep}
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
            
            <SelectField
              name="patient"
              label="Are you the patient?"
              options={isPatient}
              setNextStep={setNextStep}
              getSelectedOption={getSelectedOption}
            />
          </FormStep>
          
          <FormStep
            stepname="Patient"
            onSubmit={() => console.log("Step 3")}
            validationSchema={
              Yup.object({
                patientName: Yup.string().required(),
                patientStreet: Yup.string().required(),
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
              setNextStep={setNextStep}
              getSelectedOption={getSelectedOption}
            />
          </FormStep>

        </MultiStepForm>
      </div>
    </div>
  );
}

export default App;
