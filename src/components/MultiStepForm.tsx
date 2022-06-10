import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues, FormikHelpers } from 'formik';
import FormNavigation from "./FormNavigation";


interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  stepFlow?: any;
  nextStep: string;
  setNextStep: React.Dispatch<React.SetStateAction<string>>;
}

function MultiStepForm({ children, initialValues, onSubmit, stepFlow, nextStep, setNextStep }: Props) {
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);

  // const stepFlow = [
  //   { index: 0, name: "user", prev: null, next: "address" },
  //   { index: 1, name: "address", prev: "user", next: ["patient", "company"] },
  //   { index: 2, name: "patient", prev: "address" , next: "company" },
  //   { index: 3, name: "company", prev: "patient" , next: null },
  // ];

  const steps = React.Children.toArray(children) as React.ReactElement[];
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  useEffect(() => {
    localStorage.removeItem("prevStep");
  }, []);

  const nextFlow = () => {
    const currentStep = stepFlow[stepNumber];
    if (currentStep.next.includes(nextStep)) {
      const destination = stepFlow.find((step: any) => step.name === nextStep)
      const diff = destination.index - currentStep.index;
      if (diff > 1) {
        // If the destination is not the next immediate step in the flow (diff > 1)
        // we save the current stepNumber in case we want to navigate back later
        localStorage.setItem("prevStep", String(stepNumber));
      }
      return destination.index;
    }
    return stepFlow[stepNumber].index + 1;
  };

  const prevFlow = () => {
    let prevStep: string | number | null = localStorage.getItem("prevStep");
    if (prevStep) {
      prevStep = Number(prevStep);
      localStorage.removeItem("prevStep");
      return prevStep;
    }
    return null;
  };

  const next = (values: FormikValues) => {
    if (stepFlow) {
      const destination = nextFlow();
      setSnapshot(values);
      setStepNumber(destination);
    } else {
      setSnapshot(values);
      setStepNumber(stepNumber + 1);
    }
  };

  const previous = (values: FormikValues) => {
    if (stepFlow) {
      const destination = prevFlow();
      if (destination !== null) {
        setSnapshot(values);
        setStepNumber(destination);
      } else {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
      }
    }
  };

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }

    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 h-full">
      <Formik
        initialValues={initialValues}
        onSubmit= {handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        <div className="h-full">
          <Form className="h-full flex-col justify-between">
            <div>
              {step}
            </div>
            <div>
              <FormNavigation
                isLastStep={isLastStep}
                hasPrevious={stepNumber > 0}
                onBackClick={(values) => previous(values)}
              />
            </div>
          </Form>
        </div> 
        {/* {(formik) => (
          <div className="h-full">
            <Form className="h-full flex-col justify-between">
              <div>
                {step}
              </div>
              <div>
                <FormNavigation
                  isLastStep={isLastStep}
                  hasPrevious={stepNumber > 0}
                  onBackClick={() => previous(formik.values)}
                />
              </div>
            </Form>
          </div> 
        )} */}
      </Formik>
    </div>
  );
}

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;