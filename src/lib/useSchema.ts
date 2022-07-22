import React, { useState } from "react";

import {
  appointmentSchema01,
  appointmentSchema02,
  reasonsSchema,
  userSchema,
  patientSchema,
  callDetailsSchema,
  insuranceSchema,
  policyInfoSchema,
  policyInfoSchema01,
  creditCardSchema,
  insuranceCardSchema,
  phoneNumberSchema,
} from "./schemas"


export default function useSchemaContext() {

  const [currentSchema, setCurrentSchema] = useState<any>(appointmentSchema01);

  const loadPageSchema = (page: string, option?: string) => {
    switch (page) {
      case "/is-patient":
        if (option) {
          if (option === "yes") {
            setCurrentSchema(appointmentSchema01);
          } else {
            setCurrentSchema(appointmentSchema02);
          }
        } else {
          setCurrentSchema(appointmentSchema01);
        }
        break;
      case "/reasons":
        setCurrentSchema(reasonsSchema);
        break;
      case "/user-details":
        setCurrentSchema(userSchema);
        break;
      case "/patient-details":
        setCurrentSchema(patientSchema);
        break;
      case "select-time":
        setCurrentSchema(callDetailsSchema);
        break;
      case "/insurance-provider":
        setCurrentSchema(insuranceSchema);
        break;
      case "/policy-info":
        if (option) {
          if (option === "yes") {
            setCurrentSchema(policyInfoSchema01);
          } else {
            setCurrentSchema(policyInfoSchema);
          }
        } else {
          setCurrentSchema(policyInfoSchema01);
        }
        break;
      case "/credit-card":
        setCurrentSchema(creditCardSchema);
        break;
      case "/insurance-card":
        setCurrentSchema(insuranceCardSchema);
        break;
      case "/phone-number":
        setCurrentSchema(phoneNumberSchema);
        break;
      default:
        setCurrentSchema({});
        break;
    }
  };

  return {
    currentSchema,
    loadPageSchema,
  };
}
