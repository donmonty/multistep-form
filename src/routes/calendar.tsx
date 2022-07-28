import React, { useEffect, useState} from "react";
// import Carousel2 from "../components/Carousel2";
import DesktopCalendar from "../components/DesktopCalendar";
import TimeSlots from "../components/TimeSlots";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FormData } from "../types";
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
import { startOfToday } from "date-fns/esm";

export default function Calendar() {
  const {
    currentMonth,
    todayNumber,
    // calendarDays,
    calendarDaysDesktop,
    previousMonth,
    nextMonth,
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

  return (
    <main className="w-full h-fit md:pb-8 bg-figGray-300">
      {/* Logo */}
      <Header/>

      <div className="flex flex-col items-center w-full lg:px-7 lg:h-fit">

        <div className=" bg-white py-12 lg:pb-6 px-6 lg:px-36 xs:mt-2 md:mt-8 sm:mx-auto sm:w-full sm:max-w-full min-h-full flex flex-col justify-between md:justify-start">
          
          {/* Desktop Calendar Grid */}
          <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:gap-x-9 xl:gap-x-32">
            
            <div className="col-span-2">
              <p className="mb-4 font-CapriSans text-figGray-600 lg:text-xl">step 4 of 5</p>
              <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7">Select a time</h1>
            </div>
            
            {loadingCalendar ? (
              null
            ): (
              <div className="col-span-2 lg:col-start-1 lg:col-end-1 lg:row-start-2 lg:row-end-2 mb-1 flex justify-between items-center sm:mb-1">
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

            {/* Calendar Loader */}
            {loadingCalendar ? (
              <div className="min-w-[326px] col-span-2 md:col-span-1 row-start-2 row-end-4 animate-pulse flex justify-center items-center w-full h-[404px] md:h-[416px] bg-figGray-200 text-figGray-500 rounded-lg text-center font-Montserrat">
                <span>Loading calendar...</span>
              </div>
            ): null}

            {loadingCalendar ? null : (

              <div className="col-span-2 sm:col-span-1">
                <div className="block mb-2 min-w-[326px]">
                  <DesktopCalendar days={calendarDaysDesktop} />
                </div>
                {/* <div className="block sm:hidden">
                  <Carousel2 days={calendarDays} initialPosition={initialPosition()}/>
                </div> */}
              </div>
            )}
            

            {/* Time slots Loader */}
            {loadingCalendar ? (
              <div className="col-span-2 md:col-span-1 row-start-4 row-end-5 md:row-start-2 md:row-end-4 animate-pulse flex justify-center items-center w-full h-48 md:h-[416px] bg-figGray-200 text-figGray-500 rounded-lg text-center font-Montserrat">
                <span>Loading open time slots...</span>
              </div>
            ): (

              <div className="col-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4 ">
                <TimeSlots handleChange={setIsSlotSelected} />
              </div>
            )}

            {/* Calendar footer mobile */}
            <div className="sm:hidden col-span-2 w-full my-0">
              <div className="xs:mt-8 flex justify-between bg-figGray-200 lg:mt-0 lg:py-4 lg:max-w-[936px] mx-auto">
                <div className="xs:hidden lg:flex flex-col">
                  <p className="xs:hidden lg:block font-Montserrat text-xl">15 min | Free</p>
                  <p className="xs: hidden lg:block font-Montserrat text-lg text-figGray-600">Discovery call</p>
                </div>
                <button
                  className={`${primaryBtnStyles} lg:w-64 mt-0`}
                  disabled={!isSlotSelected || loading}
                  onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
                >
                  NEXT
                </button>
              </div>
              
            </div>
            
          </div>

        </div>

        {/* Calendar footer Desktop */}
        <div className="xs:hidden md:block w-full my-0 bg-figGray-200">
          <div className="xs:mt-8 flex justify-between bg-figGray-200 md:mt-0 md:py-4 md:max-w-[720px] lg:max-w-[680px] xl:max-w-[936px]  mx-auto">
            <div className="xs:hidden md:flex flex-col">
              <p className="xs:hidden md:block font-Montserrat text-xl">15 min | Free</p>
              <p className="xs:hidden md:block font-Montserrat text-lg text-figGray-600">Discovery call</p>
            </div>
            <button
              className={`${primaryBtnStyles} md:w-64 mt-0`}
              disabled={!isSlotSelected || loading}
              onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
            >
              NEXT
            </button>
          </div>
          
        </div>

      </div>


    </main>
  );
}