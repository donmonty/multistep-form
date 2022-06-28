import React, { useState } from "react";

import { motion } from "framer-motion";

import DayPill from ".//DayPill";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import useDateUtils from "../lib/useDateUtils";

type CarouselProps = {
  days: Date[];
  initialPosition?: number;
}

export default function Carousel(props: CarouselProps) {
  const [position, setPosition] = useState(props.initialPosition || 0);
  const {
    today,
    todayNumber,
    calendarDays,
    setToday,
    getCalendarDays,
    getDates,
    getDaySlots,
    amSlots,
    pmSlots,
    nextMonth,
    previousMonth,
    currentMonth,
    selectedDay,
    setSelectedDay,
  } = useDateUtils();

  const onRight = () => {
    if (position < props.days.length - 6) {
      setPosition(position + 1);
    }
  };
  const onLeft = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  return (
    <div className="flex sm:mx-auto sm:w-full sm:max-w-md h-20 mb-8">
      <button className="z-10" onClick={onLeft}>
        <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
      </button>

      <div className="flex w-72 overflow-hidden">
        <div className="relative">
          {props.days.map((day, index) => {
            return (
              <motion.div
                key={index}
                className="bg-slate-100 absolute w-12 h-20 flex justify-center items-center"
                initial={{ scale: 0 }}
                animate={{
                  rotate: 0,
                  left: `${(index - position) * 3}rem`, // 12 corresponds to the width of a day --> w-12
                  scale: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <DayPill day={day} currentMonth={currentMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
              </motion.div>
            )
          })}
        </div>
      </div>

      <button onClick={onRight}>
        <ChevronRightIcon className="w-8 h-8" aria-hidden="true" />
      </button>
       
    </div>
  );
}