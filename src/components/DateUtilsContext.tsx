import React, { useContext } from "react";
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

import { Slot } from "../types";

export type DateUtilsContextProps = {
  today: Date;
  todayNumber: number;
  setToday: React.Dispatch<React.SetStateAction<Date>> | null;
  calendarDays: Date[];
  calendarDaysDesktop: Date[];
  getCalendarDays: any; 
  getDates: (() => string[]) | null;
  getDaySlots: ((dayString: string) => Slot[]) | null;
  amSlots: Slot[];
  pmSlots: Slot[];
  nextMonth: () => void;
  previousMonth: () => void;
  currentMonth: string;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>> | null;
  firstDayCurrentMonth: Date;
  datesWithSlots: string[];
  setSelectedDate: React.Dispatch<React.SetStateAction<string>> | null;
};

const DateUtilsContext = React.createContext<DateUtilsContextProps>({
  today: startOfToday(),
  todayNumber: parseInt(format(startOfToday(), "dd")),
  calendarDays: [],
  calendarDaysDesktop: [],
  setToday: null,
  getCalendarDays: [],
  getDates: null,
  getDaySlots: null,
  amSlots: [],
  pmSlots: [],
  nextMonth: () => {},
  previousMonth: () => {},
  currentMonth: format(startOfToday(), "MMMM yyyy"),
  selectedDay: startOfToday(),
  setSelectedDay: null,
  firstDayCurrentMonth: parse(format(startOfToday(), 'MMM-yyyy'), 'MMM-yyyy', new Date()),
  datesWithSlots: [],
  setSelectedDate: null, 
});

// Custom hooks
export function useDateUtilsContext() {
  return useContext(DateUtilsContext);
}

// Providers
export function DateUtilsProvider({ children }: { children: any}) {
  const {
    today,
    todayNumber,
    calendarDays,
    calendarDaysDesktop,
    setToday,
    getCalendarDays,
    getDates,
    getDaySlots,
    amSlots,
    pmSlots,
    previousMonth,
    nextMonth,
    currentMonth,
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    datesWithSlots,
    setSelectedDate
  } = useDateUtils();

  return (
    <DateUtilsContext.Provider
      value={{
        today,
        todayNumber,
        calendarDays,
        calendarDaysDesktop,
        setToday,
        getCalendarDays,
        getDates,
        getDaySlots,
        amSlots,
        pmSlots,
        previousMonth,
        nextMonth,
        currentMonth,
        selectedDay,
        setSelectedDay,
        firstDayCurrentMonth,
        datesWithSlots,
        setSelectedDate
      }}
    >
      {children}
    </DateUtilsContext.Provider>
  );
}