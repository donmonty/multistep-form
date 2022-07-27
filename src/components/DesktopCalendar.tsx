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
import { Oval } from "react-loader-spinner";

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
];
const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent rounded-xl text-indigo-600 mb-3 mt-4 w-full h-96";

export default function DesktopCalendar(props: DesktopCalendarProps) {

  const {
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    datesWithSlots,
    loadingCalendar,
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
          <div>
              <div className="grid grid-cols-7 mt-10 lg:mt-0 text-sm leading-6 text-center text-gray-500">
                <div className="font-Montserrat">Mon</div>
                <div className="font-Montserrat">Tue</div>
                <div className="font-Montserrat">Wed</div>
                <div className="font-Montserrat">Thu</div>
                <div className="font-Montserrat">Fri</div>
                <div className="font-Montserrat">Sat</div>
                <div className="font-Montserrat">Sun</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-base">
                {props.days.map((day: Date, dayIdx: number) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5 border border-figGray-400 m-0'
                    )}
                  >
                    <button
                      onClick={() => {
                        setSelectedDay && setSelectedDay(day);
                        setFieldValue("callDate", format(day, 'yyyy-MM-dd'));
                      }}
                      disabled={isButtonDisabled(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-figOrange-700',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-900',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-400',
                        isEqual(day, selectedDay) && isToday(day) && 'bg-figOrange-700',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full font-Montserrat",
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
        )}
      </div>
    </div>
  );
}