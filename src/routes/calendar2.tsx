import React, { useEffect, useState} from "react";
import Carousel2 from "../components/Carousel2";
import DesktopCalendar from "../components/DesktopCalendar";
import TimeSlots from "../components/TimeSlots";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FormData } from "../types";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useDateUtilsContext } from "../components/DateUtilsContext";
import useSchemaContext from "../lib/useSchema";
import { handleNav } from "../lib/utils";
import { useFormikContext } from "formik";

export default function Calendar() {
  const {
    today,
    todayNumber,
    calendarDays,
    calendarDaysDesktop,
    setToday,
    getCalendarDays,
    getDates,
    getDaySlots,
    previousMonth,
    nextMonth,
    currentMonth,
    firstDayCurrentMonth,
    selectedDay,
  } = useDateUtilsContext();
  const [isSlotSelected, setIsSlotSelected] = useState<boolean>(false);
  let navigate = useNavigate();
  let location = useLocation();
  const { validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/insurance-provider";

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 md:w-72 md:mx-auto";

  return (
    <main className="h-screen bg-gray- flex-col items-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full min-h-full flex flex-col justify-between md:justify-start">
        <div>
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-2 md:text-center">Book a discovery call</h1>
          <h3 className="text-lg font-extrabold mb-6 sm:text-center">15 mins</h3>
          
          <div className="flex items-center mb-4 sm:px-14">
            <h2 className="flex-auto font-semibold text-gray-900">
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col justify-center md:flex-row">
            <div>
              <div className="xs:hidden sm:block mb-6 min-w-[360px]">
                <DesktopCalendar days={calendarDaysDesktop} />
              </div>
              <div className="block sm:hidden">
                <Carousel2 days={calendarDays} initialPosition={todayNumber}/>
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold mb-2">Available times</h3>
              {/* <TimeSlots handleChange={setIsSlotSelected}/> */}
            </div>
          </div>

        </div>
        <div className="w-full mt-8">
          <div>{format(selectedDay, "yyyy-MM-dd")}</div>
          <button
            className={buttonStyles}
            disabled={!isSlotSelected}
            onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
          >
            {format(selectedDay, "yyyy-MM-dd")}
          </button>
        </div>
      </div>
    </main>
  );
}