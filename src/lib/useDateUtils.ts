import React, { useState, useEffect } from "react";
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

import { dummyDates } from '../mocks/dummyDates';

export type Slot = {
  practitioner_id: number;
  slots_id: number;
  time: string;
}

export type DateRows = {
  [key: string]: Slot[];
}


export default function useDateUtils() {

  const [today, setToday] = useState<Date>(startOfToday());
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState<Date>(parse(currentMonth, 'MMM-yyyy', new Date()))
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  // const [selectedDate, setSelectedDate] = useState<string>(format(startOfToday(), 'yyyy/MM/dd'));
  const [selectedDate, setSelectedDate] = useState<string>("2022/05/17");
  const [amSlots, setAmSlots] = useState<Array<Slot>>([]);
  const [pmSlots, setPmSlots] = useState<Array<Slot>>([]);
  const [todayNumber, setTodayNumber] = useState<number>(parseInt(format(today, "dd")) - 1);
  const [selectedDay, setSelectedDay] = useState<Date>(today);

  // let today = startOfToday();
  // const currentMonth = format(today, 'MMM-yyyy'); // string
  // let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date()); // Date object

  function previousMonth() {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  /**
   * Loads all the days for the current month as Date objects
   * and stores them in local state
   */
  const getCalendarDays = () => {
    const days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    });

    const daysDelta = eachDayOfInterval({
      start: today,
      end: endOfMonth(firstDayCurrentMonth)
    });

    // If daysDelta.length < 6, add extra days from the next month to the end of the array
    // This way we make sure the carousel has 6 days in display at all times
    if (daysDelta.length < 6) {
      const nextExtraDay = add(endOfMonth(firstDayCurrentMonth), { days: 1 });
      const lastExtraDay = add(nextExtraDay, { days: 6 - daysDelta.length });
      const extraDays = eachDayOfInterval({
        start: nextExtraDay,
        end: lastExtraDay,
      });
      days.push(...extraDays);
      // return days;
    }
    // return days;
    setCalendarDays(days);
  };

  /**
   * Loads all the dates with time slots for the current month
   * @returns - a list of Date objects
   */
  const getDates = () => {
    const dates = dummyDates.dates;
    dates.map(date => parse(date, 'yyyy/MM/dd', new Date()));
    return dates;
  };

  /**
   * Loads the time slots for a given day
   * @param dayString - the day as a string in the format "yyy/MM/dd"
   * @returns Time slots for a given day
   */
  const getDaySlots = (dayString: string) => {
    const dateRows: DateRows = dummyDates.dates_rows;
    if (dateRows.hasOwnProperty(dayString)) {
      return dateRows[dayString];
    }
    return [];
  };

  /**
   * Loads the AM sots for a given day
   * @param dayString - the day as a string in the format "yyy/MM/dd"
   * @returns A list of AM slots for a given day
   */
  const getAmSlots = (dayString: string) => {
    const dateRows: DateRows = dummyDates.dates_rows;
    let morningSlots: Slot[] = [];
    if (dateRows.hasOwnProperty(dayString)) {
      const allSlots = dateRows[dayString];
      morningSlots = allSlots.map(slot => {
        const parsedHour = slot.time.slice(0, 5);
        // return parsedHour;
        return { ...slot, time: parsedHour };
      })
      .filter(slot => parseInt(slot.time.slice(0, 2)) < 12);
    }
    setAmSlots(morningSlots);
  };

  /**
   * Loads the PM sots for a given day
   * @param dayString - the day as a string in the format "yyy/MM/dd"
   * @returns A list of PM slots for a given day
   */
  const getPmSlots = (dayString: string) => {
    const dateRows: DateRows = dummyDates.dates_rows;
    let afternoonSlots: Slot[] = [];
    if (dateRows.hasOwnProperty(dayString)) {
      const allSlots = dateRows[dayString];
      afternoonSlots = allSlots.map(slot => {
        const parsedHour = slot.time.slice(0, 5);
        // return parsedHour;
        return { ...slot, time: parsedHour };
      })
      .filter(slot => parseInt(slot.time.slice(0, 2)) > 12);
    }
    setPmSlots(afternoonSlots);
  };

  useEffect(() => {
    getCalendarDays();
    getAmSlots(selectedDate);
    getPmSlots(selectedDate);
  }, [selectedDate, currentMonth]);


  return {
    today,
    todayNumber,
    setToday,
    calendarDays,
    getCalendarDays,
    getDates,
    getDaySlots,
    amSlots,
    pmSlots,
    currentMonth,
    previousMonth,
    nextMonth,
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
  }
}


