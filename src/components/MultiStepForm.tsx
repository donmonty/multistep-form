import React, { useEffect } from 'react';
import { Form, Formik, FormikConfig, FormikValues, FormikHelpers } from 'formik';
import FormNavigation from "./FormNavigation";


interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  previous: (values: FormikValues) => void;
  next: (values: FormikValues) => void;
  stepNumber: number;
}

function MultiStepForm({ children, initialValues, onSubmit, previous, next, stepNumber }: Props) {

  const steps = React.Children.toArray(children) as React.ReactElement[];
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  useEffect(() => {
    localStorage.removeItem("prevStep");
  }, []);

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
      </Formik>
    </div>
  );
}

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;