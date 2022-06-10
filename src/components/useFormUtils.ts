import React, { useEffect, useState } from "react";
import { FormikConfig, FormikHelpers, FormikValues } from 'formik';

import {
  FlowStep,
  FlowSteps,
  Option,
  Options,
  Transition,
  Transitions
} from "../types";


function useFormUtils(
  stepFlow: FlowSteps,
  transitions: Transitions,
  // children: React.ReactNode,
  initialValues: FormikValues,

) {
  const [nextStep, setNextStep] = useState(stepFlow[1].name);
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);

  const getNextStep = (event: any) => {
    const value = event.target.value;
    const step = transitions.find((item: Transition) => item.response.toLowerCase() === value.toLowerCase());
    return step && step.step;
  };

  // const steps = React.Children.toArray(children) as React.ReactElement[];
  // const step = steps[stepNumber];
  // const totalSteps = steps.length;
  // const isLastStep = stepNumber === totalSteps - 1;

  const nextFlow = () => {
    const currentStep = stepFlow[stepNumber];
    if (currentStep.next.includes(nextStep)) {
      const destination = stepFlow.find((step: FlowStep) => step.name === nextStep)
      let diff: number;
      destination ? diff = destination.index - currentStep.index : diff = 1;
      if (diff > 1) {
        // If the destination is not the next immediate step in the flow (diff > 1)
        // we save the current stepNumber in case we want to navigate back later
        localStorage.setItem("prevStep", String(stepNumber));
      }
      return destination && destination.index;
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
      destination && setStepNumber(destination);
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

  return {
    previous,
    next,
    getNextStep,
    nextStep,
    setNextStep,
    stepNumber,
  };
}

export default useFormUtils;