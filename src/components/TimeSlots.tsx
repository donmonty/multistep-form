import React, { useEffect, useState } from "react";

import { useDateUtilsContext } from "../components/DateUtilsContext";
import { Slot } from "../types";

import { FormData } from "../types";
import { useFormikContext } from "formik";

export type TimeSlotsProps = {
  handleChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSlots(props: TimeSlotsProps) {
  const { amSlots, pmSlots, selectedDay } = useDateUtilsContext();
  const [isAM, setIsAM] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | Record<string, number | string>>({});
  const { setFieldValue } = useFormikContext<FormData>();

  // console.log("callTime", values.callTime);
  // console.log("practitionerId", values.practitionerId);
  // console.log("callSlotId", values.callSlotId);
  // console.log("amSlots:", amSlots);
  // console.log("props.morningSlots", props.morningSlots);

  /**
   * Applies a series of classes depending on a set of conditions
   * @param classes boleans ans classes
   * @returns the classes to apply
   */
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  const handleSlotChange = (slot: Slot) => {
    setSelectedSlot(slot);
    setFieldValue("callTime", slot.time);
    setFieldValue("practitionerId", String(slot.practitioner_id));
    setFieldValue("callSlotId", slot.slots_id);
    if (props.handleChange) {
      props.handleChange(true);
    }
  };

  /**
   * If the selected day changes, we must reset the selected time slot to
   * an empty object and disable the "Next" button. Otherwise the UI persists
   * the selected time slot for different days and this may cause users to
   * select a time slot for the wrong day.
   */
  useEffect(() => {
    setSelectedSlot({});
    props.handleChange && props.handleChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold font-Montserrat mb-6 ml-2">Available times</h3>
      
      <div className="grid place-items-stretch gap-2 grid-cols-6 lg:grid-cols-4 grid-flow-row">

        <button
          className={classNames(
            isAM && "bg-figGray-600 text-white",
            !isAM && "bg-white border border-figGray-400 text-figGray-500",
            "col-span-3 lg:col-span-2 py-2 mb-3"
          )}
          // className="w-36 p-2 m-2 rounded-md bg-slate-200 text-xs"
          onClick={() => setIsAM(true)}
        >
          AM
        </button>

        <button
          className={classNames(
            isAM && "bg-white border border-figGray-400 text-figGray-500",
            !isAM && "bg-figGray-600 text-white",
            "col-span-3 lg:col-span-2 py-2 mb-3"
          )}
          // className="w-36 p-2 m-2 rounded-md bg-slate-200 text-xs"
          onClick={() => setIsAM(false)}
        >
          PM
        </button>
        
        {isAM ? (
          amSlots.length > 0 ? (
            amSlots.map((slot: Slot) => (
              <button
                onClick={() => {
                  setSelectedSlot(slot);
                  handleSlotChange(slot);
                }}
                key={slot.time}
                className={classNames(
                  (slot.time === selectedSlot?.time) && 'bg-figOrange-700 text-white',
                  (slot.time !== selectedSlot?.time) && "bg-slate-200",
                  "col-span-2 lg:col-span-1 p-2 m-0 rounded-lg text-sm"
                )}
                // className="p-3 m-1 w-24 bg-slate-200 rounded-full text-sm"
              >
                {`${slot.time}`}
              </button>
            ))
          ): (<span>No time slots available.</span>)
        ): null}
        {!isAM ? (
          pmSlots.length > 0 ? (
            pmSlots.map((slot: Slot) => (
              <button
                key={slot.time}
                onClick={() => {
                  setSelectedSlot(slot)
                  handleSlotChange(slot);
                }}
                className={classNames(
                  (slot.time === selectedSlot?.time) && 'bg-figOrange-700 text-white',
                  (slot.time !== selectedSlot?.time) && "bg-slate-200",
                  "col-span-2 lg:col-span-1 p-2 m-0 rounded-lg text-sm"
                )}
                // className="p-3 m-1 w-24 bg-slate-200 rounded-full text-sm"
              >
                {`${slot.time}`}
              </button>
            ))
          ): (<span>No time slots available.</span>)
        ): null}
      </div>

    </div>
  );
}