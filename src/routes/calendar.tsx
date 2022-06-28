import React from "react";
import Carousel2 from "../components/Carousel2";
import TimeSlots from "../components/TimeSlots";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

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

import useDateUtils from "../lib/useDateUtils";
import { useDateUtilsContext } from "../components/DateUtilsContext";

export default function Calendar() {
  const {
    today,
    todayNumber,
    calendarDays,
    setToday,
    getCalendarDays,
    getDates,
    getDaySlots,
    previousMonth,
    nextMonth,
    currentMonth,
  } = useDateUtilsContext();

  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full";
  // const { getCalendarDays } = useDateUtils();

  return (
    <main className="min-h-screen bg-gray- flex-col items-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Book a discovery call</h1>
          <h3 className="text-lg font-extrabold mb-6">15 mins</h3>
          
          <div className="flex items-center mb-6">
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

          <Carousel2 days={calendarDays} initialPosition={todayNumber}/>
          <h3 className="text-base font-extrabold mb-2">Available times</h3>
          <TimeSlots />
        </div>
        <div className="w-full mt-8">
          <button className={buttonStyles}>Next</button>
        </div>
      </div>
    </main>
  );
}