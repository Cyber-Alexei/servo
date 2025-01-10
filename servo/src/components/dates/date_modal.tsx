import Button from "@mui/material/Button";
import { createEvent } from "@/controllers/google-calendar.controllers";
import { updateAppointment } from "@/controllers/appointments.controllers";
import { Appointment_instance } from "@/ts-types";
import { Date_instance } from "@/ts-types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const DateModal = ({
  selectedAppointment,
  date,
  setShowDateModal,
  setSelectedAppointment,
}: {
  selectedAppointment: Appointment_instance;
  date: Date_instance;
  setShowDateModal: Dispatch<SetStateAction<number | null>>;
  setSelectedAppointment: Dispatch<SetStateAction<Appointment_instance | null>>;
}): JSX.Element => {
  // State
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  // Router
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const redirectToAuthorize = () => {
    if (!code) {
      window.location.href = "/authorization";
    }
  };
  // useEffect
  useEffect(() => {
    redirectToAuthorize();
  }, []);
  // Handle events
  const onSchedule = async (e: any) => {
    e.preventDefault();

    if (!userEmail || !userPhone) return;
    if (userPhone.length < 10) return;

    //////////
    const buildDateTime = `${date.date}T${selectedAppointment.time}`;
    const am_or_pm_index = buildDateTime.length - 3;
    const dateTimeString = buildDateTime.substring(0, am_or_pm_index);

    const datetime = new Date(dateTimeString);
    const timezoneOffset = -5 * 60;

    const adjustedDate = new Date(datetime.getTime() + timezoneOffset * 60000);
    const dateForCalendar = adjustedDate.toISOString().slice(0, 19) + "-05:00";
    //------------------
    datetime.setHours(datetime.getHours() + 1);
    const adjustedDateEnd = new Date(
      datetime.getTime() + timezoneOffset * 60000,
    );
    const endDateForCalendar =
      adjustedDateEnd.toISOString().slice(0, 19) + "-05:00";
    //////////
    const dataForCreateEventCalendar = {
      summary: date.summary,
      description: date.description,
      timezone: date.timezone,
      admin_email: date.admin_email,
      user_email: userEmail,
      datetime: dateForCalendar,
      datetimeend: endDateForCalendar,
    };

    //////////

    if (!code) return;
    const controllerResponse = await createEvent({
      code: code,
      data: dataForCreateEventCalendar,
    });
    console.log(controllerResponse, "kk");
    if (controllerResponse.success) {
      const { link } = controllerResponse.detail;
      const data = {
        link: link,
        scheduled: true,
        user_email: userEmail,
        user_phone: Number(userPhone),
      };
      const controllerResponse2 = await updateAppointment({
        id: selectedAppointment.id,
        data: data,
      });
      console.log(controllerResponse2, "jj");
      if (controllerResponse2.success) {
        history.replaceState(null, "", "http://localhost:3000/thanks");
        window.location.href = "http://localhost:3000/thanks";
      }
    }
  };

  const onNoSchedule = () => {
    setShowDateModal(null);
    setSelectedAppointment(null);
  };

  // JSX
  return (
    <div className="absolute flex flex-col gap-4 items-center justify-center top-0 left-0 bg-purple-500 w-full h-full rounded-md">
      <p className="font-medium text-lg text-center text-white">
        Do you want to schedule the date{" "}
        <span className="text-xl font-bold px-2">{date.date}</span> at{" "}
        <span className="text-xl font-bold px-2">
          {selectedAppointment.time}
        </span>
      </p>
      <form onSubmit={onSchedule}>
        <div className="flex gap-4 text-gray-500">
          <input
            className="focus:outline-none rounded-md px-2"
            type="email"
            placeholder="Authorized E-mail *"
            value={userEmail}
            onChange={({ target: { value } }) => setUserEmail(value)}
          />
          <input
            className="focus:outline-none rounded-md px-2"
            type="text"
            placeholder="Phone *"
            value={userPhone}
            onChange={({ target: { value } }) => {
              const result = value.split("").every((number) => {
                if (
                  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                    number,
                  )
                ) {
                  return true;
                } else {
                  return false;
                }
              });
              if (result === true) {
                setUserPhone(value);
              } else {
                return;
              }
            }}
          />
        </div>
        <div className="flex gap-4 justify-center pt-4">
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#ffd330",
              fontWeight: "600",
            }}
          >
            Yes!
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#ffd330",
              fontWeight: "600",
            }}
            onClick={onNoSchedule}
          >
            No
          </Button>
        </div>
      </form>
    </div>
  );
};
