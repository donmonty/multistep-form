import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import Calendar from './routes/calendar';
import { DateUtilsProvider } from './components/DateUtilsContext';
import { SchemaProvider } from "./components/SchemaContext";
import { Formik } from 'formik';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DateUtilsProvider>
    <SchemaProvider>
      <App />
    </SchemaProvider>
  </DateUtilsProvider>

  // <DateUtilsProvider>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="calendar" element={<Calendar />} />
  //     </Routes>
  //   </BrowserRouter>
  // </DateUtilsProvider>


  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
