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
import { getAvailableSlots } from "./utils";
import { Slot, DateRows, AvailableDates, SlotsAPIResponse } from '../types';

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

  const [dateRows, setDateRows] = useState<DateRows | Record<string, Slot[]>>({});
  const [availableDates, setAvailableDates] = useState<AvailableDates>([]);
  const [amSlots, setAmSlots] = useState<Slot[]>([]);
  const [pmSlots, setPmSlots] = useState<Array<Slot>>([]);
  const [todayNumber, setTodayNumber] = useState<number>(parseInt(format(today, "dd")) - 1);
  const [selectedDay, setSelectedDay] = useState<Date>(() => startOfToday());
  const [datesWithSlots, setDatesWithSlots] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCalendar, setLoadingCalendar] = useState<boolean>(true);

  let firstDay = parse(currentMonth, 'MMM-yyyy', new Date())

  function previousMonth() {
    const firstDayPrevMonth = add(firstDay, { months: -1 });
    // const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    console.log("Clicked next month!");
    const firstDayNextMonth = add(firstDay, { months: 1 });
    // const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    // setFirstDayCurrentMonth(parse(currentMonth, 'MMM-yyyy', new Date()));
  }

  /**
   * Loads date data from the API
   */
  const getAllDatesData = async () => {
    const dates = await getAvailableSlots();
    setAvailableDates([...dates.dates]);
    setDateRows({...dates.dates_rows});
    // if (dates) {
    //   setAvailableDates([...dates.dates]);
    //   setDateRows({...dates.dates_rows});
    // } else {
    //   setAvailableDates([]);
    //   setDateRows({});
    // }
  };

  /**
   * Loads all the days for the current month as Date objects
   * and stores them in local state
   */
  const getCalendarDays = () => {
    const days = eachDayOfInterval({
      start: firstDay,
      end: endOfMonth(firstDay),
    });
    setCalendarDaysDesktop(days);

    const daysDelta = eachDayOfInterval({
      start: firstDay,
      // start: today,
      end: endOfMonth(firstDay)
    });

    // If daysDelta.length < 6, add extra days from the next month to the end of the array
    // This way we make sure the carousel has 6 days in display at all times
    if (daysDelta.length < 6) {
      const nextExtraDay = add(endOfMonth(firstDay), { days: 1 });
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
    const dates = availableDates;
    // const dates = dummyDates.dates;
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
    // Commented code is for real API calls when it's ready
    // const dates = await getAvailableSlots();
    // if (!dates) setAvailableSlots([]);
    // const dateRows = dates.dates_rows;
    const dateRows: DateRows = dummyDates.dates_rows; // <-- Delete when real API is ready
    if (dateRows.hasOwnProperty(dayString)) {
      // setAvailableSlots(dateRows[dayString]);
      return dateRows[dayString];
    }
    // setAvailableSlots([])
    return [];
  };

  /**
   * Loads the AM (morning) slots for a given day
   * @param day - a Date object
   * @returns A list of AM slots for a given day
   */
  const getAmSlots = (day: Date) => {
    const dateString = format(day, 'yyyy/MM/dd');
    // const dateRows: DateRows = dummyDates.dates_rows;
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
    // const dateRows: DateRows = dummyDates.dates_rows;
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

  const handleAllDates = async () => {
    setLoadingCalendar(true);
    await getAllDatesData();
    getCalendarDays();
    setLoadingCalendar(false);
  };

  useEffect(() => {
    // handleAllDates();
    getDates();
    getAmSlots(selectedDay);
    getPmSlots(selectedDay);
  }, [selectedDay, availableDates, currentMonth]);

  useEffect(() => {
    handleAllDates();
    // await getAllDatesData();
    // getDates();
    // getCalendarDays();
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
    loading,
    loadingCalendar,
  }
}


