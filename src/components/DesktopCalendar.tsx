import React from "react";
import {
  // add,
  // eachDayOfInterval,
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
  // parseISO,
  startOfToday,
} from 'date-fns';

import { FormData } from "../types";
import { useFormikContext } from "formik";
import { useDateUtilsContext } from "../components/DateUtilsContext";

type DesktopCalendarProps = {
  days: Date[];
};

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

export default function DesktopCalendar(props: DesktopCalendarProps) {

  const {
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    datesWithSlots,
  } = useDateUtilsContext();

  const { setFieldValue } = useFormikContext<FormData>();

  /**
   * Check if the day button should be disabled
   * @param day Date object
   * @returns true if the button should be disabled, false if not
   */
   const isButtonDisabled = (day: Date) => {
    const isInitialDate = isEqual(day, selectedDay) && isToday(day);
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

  return (
    <div className="max-w-md mx-auto md:max-w-4xl">
      <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
        <div>
            <div className="grid grid-cols-7 mt-10 text-sm leading-6 text-center text-gray-500">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {props.days.map((day: Date, dayIdx: number) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    onClick={() => {
                      console.log("Calendar day is:", day);
                      setSelectedDay && setSelectedDay(day);
                      console.log("day was set");
                      setFieldValue("callDate", format(day, 'yyyy-MM-dd'));
                    }}
                    disabled={isButtonDisabled(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                  <div className="w-1 h-1 mx-auto mt-1">
                    {(datesWithSlots.some((item: string) => isSameDay(parse(item, "yyyy/MM/dd", new Date()), day))
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}