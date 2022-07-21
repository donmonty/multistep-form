import React, { useEffect, useState} from "react";
// import Carousel2 from "../components/Carousel2";
import DesktopCalendar from "../components/DesktopCalendar";
import TimeSlots from "../components/TimeSlots";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FormData } from "../types";
import { Oval } from "react-loader-spinner";

import { format, isEqual, parse } from 'date-fns';

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useDateUtilsContext } from "../components/DateUtilsContext";
import useSchemaContext from "../lib/useSchema";
import { handleNav } from "../lib/utils";
import { useFormikContext } from "formik";
import { startOfMonth, startOfToday } from "date-fns/esm";

export default function Calendar() {
  const {
    currentMonth,
    todayNumber,
    calendarDays,
    calendarDaysDesktop,
    previousMonth,
    nextMonth,
    firstDayCurrentMonth,
    loading,
    loadingCalendar,
  } = useDateUtilsContext();

  const [isSlotSelected, setIsSlotSelected] = useState<boolean>(false);
  let navigate = useNavigate();
  let location = useLocation();
  const { validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/insurance-provider";

  const initialPosition = () => {
    // if currently selected month is different than the actual month, position = first day of selected month
    // Else, position = todayNumber (today in number format)
    const selectedMonth = parse(currentMonth, "MMM-yyyy", new Date());
    const actualMonth = parse(format(startOfToday(), "MMM-yyyy"), "MMM-yyyy", new Date());
    if (isEqual(selectedMonth, actualMonth)) {
      return todayNumber;
    }
    const firstDayOfSelectedMonth = parseInt(format(selectedMonth, "dd")) - 1;
    return firstDayOfSelectedMonth;
  };

  let firstDay = parse(currentMonth, 'MMM-yyyy', new Date())

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 md:w-72 md:mx-auto";
  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent rounded-xl text-indigo-600 mb-3 mt-4 w-full h-96";

  return (
    <main className="h-screen bg-gray- flex-col items-center py-12 px-6 lg:px-24 xl:px-64">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full min-h-full flex flex-col justify-between md:justify-start">
        
        <div className="grid grid-cols-1 gap-x-0 sm:gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <button className="align-self-start" onClick={() => navigate(-1)}>
              <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
          <div className="col-span-2">
            <h1 className="text-3xl font-extrabold mb-2 md:text-center">Book a discovery call</h1>
            <h3 className="text-lg font-extrabold mb-6 sm:text-center">15 mins</h3>
          </div>
          
          {loadingCalendar ? (null
          ): (
            <div className="col-span-2 mb-1 flex justify-between sm:justify-start items-center sm:mb-1 sm:ml-4">
              <h2 className="inline mr-4 font-semibold text-gray-900">
                {format(firstDay, 'MMMM yyyy')}
              </h2>
              <div className="flex">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
                </button>
                <button
                  onClick={() => nextMonth()}
                  type="button"
                  className="-my-1 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-8 h-8" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <div className="col-span-2 sm:col-span-1">
            <div className="block mb-2 min-w-[326px]">
            {/* <div className="xs:hidden sm:block mb-6 min-w-[360px]"> */}
              <DesktopCalendar days={calendarDaysDesktop} />
            </div>
            {/* <div className="block sm:hidden">
              <Carousel2 days={calendarDays} initialPosition={initialPosition()}/>
            </div> */}
          </div>
          
          {loadingCalendar ? (
            <div className={loaderStyles}>
              <Oval
                ariaLabel="loading-indicator"
                height={48}
                width={48}
                strokeWidth={6}
                color="white"
                secondaryColor="blue"
              />
            </div>
          ): (

            <div className="col-span-1 sm:justify-self-end">
              <TimeSlots handleChange={setIsSlotSelected} />
            </div>
          )}

        </div>

        <div className="w-full mt-8">
          <button
            className={buttonStyles}
            disabled={!isSlotSelected || loading}
            onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}