import React, { useEffect, useState} from "react";
// import Carousel2 from "../components/Carousel2";
import DesktopCalendar from "../components/DesktopCalendar";
import TimeSlots from "../components/TimeSlots";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FormData } from "../types";
import { Oval } from "react-loader-spinner";
import Header from "../components/Header";

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

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-figOrange-700 self-center";

  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent rounded-xl text-indigo-600 mb-3 mt-4 w-full h-96";

  return (
    <main className="w-full h-fit lg:pb-6 bg-figGray-300">
      {/* Logo */}
      <Header/>

      <div className="flex flex-col items-center w-full lg:px-7 lg:h-fit">

        <div className=" bg-white py-12 lg:pb-6 px-6 lg:px-48 xl:px-48 mt-8 sm:mx-auto sm:w-full sm:max-w-full min-h-full flex flex-col justify-between md:justify-start">
          
          {/* Desktop Calendar Grid */}
          <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2 lg:gap-x-16">
            
            <div className="col-span-2">
              <p className="mb-4 font-CapriSans text-figGray-600 lg:text-xl">step 3 of 5</p>
              <h1 className=" text-3xl lg:text-4xl font-extrabold mb-2 md:text-left">Select a time</h1>
            </div>
            
            {loadingCalendar ? (null
            ): (
              <div className="col-span-2 mb-1 flex justify-between sm:justify-start items-center sm:mb-1">
                <h2 className="inline mr-4 font-semibold text-black text-xl font-Montserrat">
                  {format(firstDay, 'MMMM yyyy')}
                </h2>
                <div className="flex">
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="my-0 flex items-center justify-center p-1 text-gray-400 hover:text-gray-500 border border-figGray-500 h-8"
                  >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => nextMonth()}
                    type="button"
                    className="my-0 ml-1 flex items-center justify-center p-1 text-gray-400 hover:text-gray-500 border border-figGray-500 h-8"
                  >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
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

              <div className="col-span-1 ">
                <TimeSlots handleChange={setIsSlotSelected} />
              </div>
            )}
            
            {/* Calendar footer */}
            <div className="col-span-2 my-0">
              <div className="xs:mt-8 flex justify-between bg-figGray-200 lg:mt-0 lg:p-6">
                <div className="xs:hidden lg:flex flex-col">
                  <p className="font-Montserrat text-xl">15 min | Free</p>
                  <p className="font-Montserrat text-lg text-figGray-600">Discovery call</p>
                </div>
                <button
                  className={`${primaryBtnStyles} lg:w-64 mt-0`}
                  disabled={!isSlotSelected || loading}
                  onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
                >
                  Next
                </button>
              </div>
              
            </div>

          </div>

        </div>

      </div>


    </main>
  );
}