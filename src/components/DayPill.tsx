import React from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';

import { FormData } from "../types";
import { useFormikContext } from "formik";

type DayPillProps = {
  day: Date;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  currentMonth: string;
}

function DayPill(props: DayPillProps) {

  const { setFieldValue, values } = useFormikContext<FormData>();
  console.log("callDdate", values.callDate);

  /**
   * Check if the day button should be disabled
   * @param day Date object
   * @returns true if the button should be disabled, false if not
   */
  const isButtonDisabled = (day: Date) => {
    const isInitialDate = isEqual(props.day, props.selectedDay) && isToday(props.day);
    if (!isInitialDate) {
      // If the day is not the initial date, return true if it is before or after the current day
      return isAfter(day, endOfMonth(startOfToday())) || isBefore(day, startOfToday());
    }
    // If the day is the initial date, return true if it's after the current end of month
    return isAfter(day, endOfMonth(startOfToday()));
  };

  /**
   * Applies a series of classes depending on a set of conditions
   * @param classes boleans ans classes
   * @returns the classes to apply
   */
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  let firstDayCurrentMonth = parse(props.currentMonth, 'MMM-yyyy', new Date());

  return (
    <div
      // className="bg-slate-300 h-16 w-9 rounded-full flex justify-center items-center"
      className={classNames(
        isEqual(props.day, props.selectedDay) && 'text-white',
        !isEqual(props.day, props.selectedDay) &&
          isToday(props.day) &&
          'text-red-500',
        !isEqual(props.day, props.selectedDay) &&
          !isToday(props.day) &&
          isSameMonth(props.day, firstDayCurrentMonth) &&
          'text-gray-900',
        !isEqual(props.day, props.selectedDay) &&
          !isToday(props.day) &&
          !isSameMonth(props.day, firstDayCurrentMonth) &&
          'text-gray-400',
        isEqual(props.day, props.selectedDay) && isToday(props.day) && 'bg-red-500',
        isEqual(props.day, props.selectedDay) &&
          !isToday(props.day) &&
          'bg-gray-900',
        !isEqual(props.day, props.selectedDay) && 'hover:bg-gray-200',
        (isEqual(props.day, props.selectedDay) || isToday(props.day)) &&
          'font-semibold',
        "bg-slate-300 h-16 w-9 rounded-full flex justify-center items-center"
      )}
    >
      <button
        onClick={() => {
          props.setSelectedDay(props.day);
          setFieldValue("callDate", format(props.day, 'yyyy-MM-dd'));
        }}
        disabled={isButtonDisabled(props.day)}
      >
        <time
          dateTime={format(props.day, 'yyyy-MM-dd')}
          className="flex-col items-center justify-center w-full h-full"
        >
          <div className="">
            {format(props.day, 'd')}
          </div>
          <div className="text-xs">
            {format(props.day, 'EEE')}
          </div>
        </time>
      </button>
    </div>
  );
}

export default DayPill;