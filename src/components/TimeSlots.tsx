import React, { useEffect, useState } from "react";

import { useDateUtilsContext } from "../components/DateUtilsContext";
import { Slot } from "../types";

import { FormData } from "../types";
import { useFormikContext } from "formik";
import { Oval } from "react-loader-spinner";

export type TimeSlotsProps = {
  handleChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSlots(props: TimeSlotsProps) {
  const { amSlots, pmSlots, selectedDay, loadingCalendar } = useDateUtilsContext();
  const [isAM, setIsAM] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | Record<string, number | string>>({});
  const { setFieldValue } = useFormikContext<FormData>();

  const loaderStyles = "flex justify-center items-center py-2 px-2 border border-transparent rounded-xl text-indigo-600 mb-3 mt-4 w-full h-96";

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
      <h3 className="text-base font-extrabold mb-2 ml-2">Available times</h3>
      <div className="flex mb-4">
        <button
          className={classNames(
            isAM && "bg-indigo-600 text-white",
            !isAM && "bg-slate-200",
            "w-36 p-2 m-2 rounded-md text-xs"
          )}
          // className="w-36 p-2 m-2 rounded-md bg-slate-200 text-xs"
          onClick={() => setIsAM(true)}
        >
          AM
        </button>
        <button
          className={classNames(
            isAM && "bg-slate-200",
            !isAM && "bg-indigo-600 text-white",
            "w-36 p-2 m-2 rounded-md text-xs"
          )}
          // className="w-36 p-2 m-2 rounded-md bg-slate-200 text-xs"
          onClick={() => setIsAM(false)}
        >
          PM
        </button>
      </div>
      
      <div className="grid-cols-3 max-w-[320px]">
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
                  (slot.time === selectedSlot?.time) && 'bg-indigo-600 text-white',
                  (slot.time !== selectedSlot?.time) && "bg-slate-200",
                  "p-3 m-1 w-24 rounded-full text-sm"
                )}
                // className="p-3 m-1 w-24 bg-slate-200 rounded-full text-sm"
              >
                {`${slot.time}am`}
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
                  (slot.time === selectedSlot?.time) && 'bg-indigo-600 text-white',
                  (slot.time !== selectedSlot?.time) && "bg-slate-200",
                  "p-3 m-1 w-24 rounded-full text-sm"
                )}
                // className="p-3 m-1 w-24 bg-slate-200 rounded-full text-sm"
              >
                {`${slot.time}pm`}
              </button>
            ))
          ): (<span>No time slots available.</span>)
        ): null}
      </div>

    </div>
  );
}