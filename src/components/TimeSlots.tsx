import React, { useState } from "react";

import { useDateUtilsContext } from "../components/DateUtilsContext";
import { Slot } from "../types";

import { FormData } from "../types";
import { useFormikContext } from "formik";

export type TimeSlotsProps = {
  handleChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSlot(props: TimeSlotsProps) {
  const { amSlots, pmSlots } = useDateUtilsContext();
  const [isAM, setIsAM] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot>(amSlots[0] || pmSlots[0]);
  const { setFieldValue, values } = useFormikContext<FormData>();

  console.log("callTime", values.callTime);
  console.log("practitionerId", values.practitionerId);
  console.log("callSlotId", values.callSlotId);

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

  return (
    <div className="flex-col">
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

      <div className="flex flex-wrap">
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