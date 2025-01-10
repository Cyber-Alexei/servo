"use client";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createAppointment } from "@/controllers/appointments.controllers";

export const CreateAppointment = ({
  dateId,
  setReloadAppointments,
}: {
  dateId: number;
  setReloadAppointments: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  // State
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [am_or_pm, set_am_or_pm] = useState<string | null>(null);

  // Handle events
  const onHoursChange = (value: string) => {
    if (value === "") {
      setHours(value);
      return;
    }
    if (value.length === 3) return;
    if (
      !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        value[value.length - 1],
      )
    ) {
      return;
    }
    if (hours === "" && Number(value[0]) > 2) return;
    if (hours[0] === "2" && Number(value[1]) > 4) return;

    setHours(value);
  };

  const onMinutesChange = (value: string) => {
    if (hours[0] === "2" && hours[1] === "4" && Number(value) > 0) return;
    if (value === "") {
      setMinutes(value);
      return;
    }
    if (value.length === 3) return;
    if (
      !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        value[value.length - 1],
      )
    ) {
      return;
    }
    if (minutes === "" && Number(value[0]) > 5) return;

    setMinutes(value);
  };

  const onSaveAppointment = async () => {
    if (hours.length !== 2 && minutes.length !== 2) return;

    const data = {
      time: `${hours}:${minutes}-${am_or_pm}`,
      dateid: dateId,
    };

    const controllerResponse = await createAppointment(data);

    if (controllerResponse.success) {
      setHours("");
      setMinutes("");
      setReloadAppointments((prevState) => !prevState);
    }
  };

  // useEffect
  useEffect(() => {
    if (hours.length >= 1) {
      if (Number(hours) >= 12) {
        set_am_or_pm("PM");
      } else {
        set_am_or_pm("AM");
      }
    } else {
      set_am_or_pm(null);
    }
    if (hours === "24") {
      setMinutes("00");
    }
  }, [hours]);

  // JSX
  return (
    <div className="inline-flex flex-col gap-4 py-2">
      <div className="flex gap-1 text-gray-500">
        <input
          name="hours"
          className="focus:outline-none bg-gray-100 w-[30px] px-1"
          type="text"
          value={hours}
          onChange={({ target: { value } }) => onHoursChange(value)}
        />
        <p>:</p>
        <input
          name="minutes"
          className="focus:outline-none bg-gray-100 w-[30px] px-1"
          type="text"
          value={minutes}
          onChange={({ target: { value } }) => onMinutesChange(value)}
        />
        {am_or_pm && <p>{am_or_pm}</p>}
      </div>
      <Button
        sx={{
          backgroundColor: "var(--maincolor)",
          fontSize: "12px",
          fontWeight: "600",
        }}
        variant="contained"
        onClick={onSaveAppointment}
      >
        Add new appointmen
      </Button>
    </div>
  );
};
