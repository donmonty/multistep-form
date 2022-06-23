import React, { useState, useRef, useEffect } from "react";
import { FormikValues } from 'formik';

import {
  FlowStep,
  FlowSteps,
  Transition,
  TransitionsObject
} from "../types";

/**
 * Custom hook that handles the navigation logic for the multi step form
 * @param stepFlow - an object that represents the form's steps
 * @param transitions - an object that represents the form's transitions
 * @param initialValues - the initial values for all of the form's fields
 * @returns
 * - previous: a function to navigate to the next form step
 * - next: a function to navigate to the last visited form step
 * - getNextStep: determines which flow to navigate next when different select options have different routes 
 * - stepNumber: the current step number (index)
 * - nextStep: the next step's name
 * - setNextStep: state setting function for nextStep
 */
function useFormUtils(
  stepFlow: FlowSteps,
  transitions: TransitionsObject,
  initialValues: FormikValues,

) {
  const [nextStep, setNextStep] = useState<string | null>(stepFlow[1].name);
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);

  // const isSameNextStep = useRef(stepFlow[1].name);
  // console.log("isSameNextStep:", isSameNextStep.current);

  // useEffect(() => {
  //   if (isSameNextStep.current === nextStep && stepNumber !== 0) {
  //     console.log("isSameNextStep.current === nextStep");
  //     setNextStep(stepFlow[stepNumber].next[0] || null);
  //     isSameNextStep.current = nextStep;
  //   }
  // }, [stepNumber]);

  // console.log("nextStep:", nextStep);

  /**
   * Returns the name of the next transition to navigate next when different select options have different routes
   * @param event: the event triggered by the <option/> HTML element in a <Select/> field 
   * @returns the name of the step to transition to next
   */
  const getNextStep = (event: any, transitionName: string) => {
    const value = event.target.value;
    const selectedTransitions = transitions[transitionName];
    const step = selectedTransitions.find((item: Transition) => item.response.toLowerCase() === value.toLowerCase());
    return step && step.step;
  };

  /**
   * Returns the step number to navigate next. It saves the step number in localStorage
   * in case the next step is not the immediate step in the flow and the user wants to come back
   * @returns the step number to navigate next
   */
  const nextFlow = () => {
    const currentStep = stepFlow[stepNumber];
    if (currentStep.next.includes(nextStep)) {
      const destination = stepFlow.find((step: FlowStep) => step.name === nextStep)
      // let diff: number;
      // destination ? diff = destination.index - currentStep.index : diff = 1;
      // if (diff > 1) {
      //   // If the destination is not the next immediate step in the flow (diff > 1)
      //   // we save the current stepNumber in case we want to navigate back later
      //   localStorage.setItem("prevStep", String(stepNumber));
      // }
      localStorage.setItem("prevStep", String(stepNumber));
      return destination && destination.index;
    }
    localStorage.setItem("prevStep", String(stepNumber));
    return stepFlow[stepNumber].index + 1;
  };

  /**
   * Returns the step number for navigating back to a previous step. Because the previous step could
   * not necessarily be the immediate step in the flow, it checks this value in localStorage
   * @returns 
   */
  const prevFlow = () => {
    let prevStep: string | number | null = localStorage.getItem("prevStep");
    if (prevStep) {
      prevStep = Number(prevStep);
      localStorage.removeItem("prevStep");
      return prevStep;
    }
    return null;
  };

  /**
   * Navigates to the next step in the form
   * @param values - all the form's current values
   */
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

  /**
   * Navigates to the previous step in the form
   * @param values - all the form's current values 
   */
  const previous = (values: FormikValues) => {
    if (stepFlow) {
      const destination = prevFlow();
      console.log("destination:", destination);
      if (destination !== null) {
        setSnapshot(values);
        setStepNumber(destination);
      } else {
        console.log("No prev value in localStorage!");
        console.log("stepNumber:", stepNumber);
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
    snapshot,
  };
}

export default useFormUtils;