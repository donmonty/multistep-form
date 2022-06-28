import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";

import DayPill from ".//DayPill";

type CarouselProps = {
  days: Date[];
}

export default function Carousel(props: CarouselProps) {
  const [width, setWidth] = useState(0);
  const carousel = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  return(
    <motion.div
      ref={carousel}
      className="cursor-grab overflow-hidden bg-slate-600"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        className="flex bg-slate-500"
        // dragConstraints={{ right: 0, left: -width }}
        dragConstraints={{ right: 0, left: -width }}
      >
        {props.days.map((day, index) => {
          return (
            <motion.div className="" key={index}>
              {/* <DayPill day={day} /> */}
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  );
}

