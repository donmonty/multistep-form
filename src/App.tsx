import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSchemaContext } from "./components/SchemaContext";
import { initialValues } from "./lib/schemas";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Formik } from "formik";

import IsPatient from "./routes/IsPatient";
import YourDetails from "./routes/YourDetails";
import Reasons from "./routes/Reasons";
import UserDetails from "./routes/UserDetails";
import Page3 from "./routes/page3";
import PatientDetails from "./routes/PatientDetails";
import Calendar from "./routes/calendar";
import Insurance from "./routes/Insurance";
import InsuranceInformation from "./routes/InsuranceInformation";
import PolicyInfo from "./routes/PolicyInfo";
import CreditCard from "./routes/CreditCard";
import InsuranceCard from "./routes/InsuranceCard";
import PhoneNumber from "./routes/PhoneNumber";
import Confirmation from "./routes/Confirmation";
import StripeCard from "./routes/StripeCard";
import ConfirmationCode from "./routes/ConfirmationCode";
import Booked from "./routes/Booked";

const stripePromise = loadStripe("pk_test_6ZxeR0AeamejAOzO0lMj8yqq003hfE7WoQ"); // Replace with your own test key!
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST as string);

export default function App() {
  const { currentSchema } = useSchemaContext();

  // This is the function that will be called when the user clicks the submit button
  // in the last page of the form.
  const onSubmit = (values: any) => alert(JSON.stringify(values, null, 2));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={currentSchema}
    >
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IsPatient />} />
            <Route path="your-details" element={<YourDetails />} />
            <Route path="reasons" element={<Reasons />} />
            <Route path="user-details" element={<UserDetails />} />
            <Route path="patient-details" element={<PatientDetails />} />
            <Route path="select-time" element={<Calendar />} />
            <Route path="insurance-provider" element={<Insurance />} />
            <Route
              path="insurance-information"
              element={<InsuranceInformation />}
            />
            <Route path="policy-info" element={<PolicyInfo />} />
            <Route path="credit-card" element={<CreditCard />} />
            <Route path="insurance-card" element={<InsuranceCard />} />
            <Route path="phone-number" element={<PhoneNumber />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="stripe-card" element={<StripeCard />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="confirmation-code" element={<ConfirmationCode />} />
            <Route path="booked" element={<Booked />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </Formik>
  );
}
