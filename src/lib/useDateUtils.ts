import React, { useState, useEffect } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  // getDay,
  // isEqual,
  // isSameDay,
  // isSameMonth,
  // isToday,
  parse,
  // parseISO,
  startOfToday,
} from 'date-fns';

import { dummyDates } from '../mocks/dummyDates';
import { Slot, DateRows } from '../types';

/**
 * Custom hook for managing all booking calls logic
 * @returns
 * - today: Date --> today's date
 * - setToday: React.Dispatch<React.SetStateAction<Date>> --> setter for today's date
 * - todayNumber: number --> today's number
 * - currentMonth: string --> the current month as a string
 * - calendarDays: Date[] --> array of dates for the current month for mobile view
 * - calendarDaysDesktop: Date[] --> array of dates for the current month for desktop view
 * - getCalendarDays: () => void --> function to get the calendar days
 * - getDates: () => string[] --> function to get the dates with available time slots for discovery calls
 * - getDaySlots: (dayString: string) => Slot[] --> function to get the time slots for a given day (AM and PM)
 * - amSlots: Slot[] --> array of morning time slots for a given day
 * - pmSlots: Slot[] --> array of afternoon time slots for a given day
 * - previousMonth: () => void --> function to set the calendar to the previous month
 * - nextMonth: () => void --> function to set the calendar to the next month
 * - selectedDay: Date --> the selected day whenever pressing a day in the calendar
 * - setSelectedDay: React.Dispatch<React.SetStateAction<Date>> --> setter for the selected day
 * - firstDayCurrentMonth: Date --> the first day of the current month
 * - datesWithSlots: string[] --> array of dates with available time slots for discovery calls
 */
export default function useDateUtils() {

  const [today, setToday] = useState<Date>(startOfToday());
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState<Date>(parse(currentMonth, 'MMM-yyyy', new Date()))
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [calendarDaysDesktop, setCalendarDaysDesktop] = useState<Date[]>([]);
  // const [selectedDate, setSelectedDate] = useState<string>(format(startOfToday(), 'yyyy/MM/dd'));
  const [selectedDate, setSelectedDate] = useState<string>("2022/07/17");
  const [amSlots, setAmSlots] = useState<Slot[]>([]);
  const [pmSlots, setPmSlots] = useState<Array<Slot>>([]);
  const [todayNumber, setTodayNumber] = useState<number>(parseInt(format(today, "dd")) - 1);
  const [selectedDay, setSelectedDay] = useState<Date>(() => startOfToday());
  const [datesWithSlots, setDatesWithSlots] = useState<Array<string>>([]);

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
    setCalendarDaysDesktop(days);

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
    }
    setCalendarDays(days);
  };

  /**
   * Loads all the dates with time slots for the current month
   * @returns - a list of Date objects
   */
  const getDates = () => {
    const dates = dummyDates.dates;
    dates.map(date => parse(date, 'yyyy/MM/dd', new Date()));
    setDatesWithSlots(dates);
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
   * Loads the AM (morning) slots for a given day
   * @param day - a Date object
   * @returns A list of AM slots for a given day
   */
  const getAmSlots = (day: Date) => {
    const dateString = format(day, 'yyyy/MM/dd');
    const dateRows: DateRows = dummyDates.dates_rows;
    let morningSlots: Slot[] = [];
    if (dateRows.hasOwnProperty(dateString)) {
      const allSlots = dateRows[dateString];
      morningSlots = allSlots.map(slot => {
        const parsedHour = slot.time.slice(0, 5);
        return { ...slot, time: parsedHour };
      })
      .filter(slot => parseInt(slot.time.slice(0, 2)) < 12);
    }
    setAmSlots([...morningSlots]);
  };

  /**
   * Loads the PM sots for a given day
   * @param day - a Date object
   * @returns A list of PM slots for a given day
   */
  const getPmSlots = (day: Date) => {
    const dateString = format(day, 'yyyy/MM/dd');
    const dateRows: DateRows = dummyDates.dates_rows;
    let afternoonSlots: Slot[] = [];
    if (dateRows.hasOwnProperty(dateString)) {
      const allSlots = dateRows[dateString];
      afternoonSlots = allSlots.map(slot => {
        const parsedHour = slot.time.slice(0, 5);
        return { ...slot, time: parsedHour };
      })
      .filter(slot => parseInt(slot.time.slice(0, 2)) > 12);
    }
    setPmSlots([...afternoonSlots]);
  };

  useEffect(() => {
    getAmSlots(selectedDay);
    getPmSlots(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    getDates();
    getCalendarDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth])


  return {
    today,
    todayNumber,
    setToday,
    calendarDays,
    calendarDaysDesktop,
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
    datesWithSlots,
    setSelectedDate,
  }
}


