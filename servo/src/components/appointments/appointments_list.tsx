import {
  getDateAllAppointments,
  deleteAppointment,
} from "@/controllers/appointments.controllers";
import { Appointment_instance } from "@/ts-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const AppointmentsList = ({
  user,
  dateid,
  setShowDateModal,
  setSelectedAppointment,
  setShowAppointmentDataModal,
  reloadAppointments,
  setReloadAppointments,
}: {
  user: string;
  dateid: number;
  setShowDateModal: Dispatch<SetStateAction<number | null>>;
  setSelectedAppointment: Dispatch<SetStateAction<Appointment_instance | null>>;
  setShowAppointmentDataModal: Dispatch<SetStateAction<number | null>>;
  reloadAppointments: boolean;
  setReloadAppointments: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  // State
  const [appointments, setAppointments] = useState<
    Appointment_instance[] | null
  >(null);

  // Handle events
  const onAppointmentDelete = async (id: number) => {
    const controllerResponse = await deleteAppointment(id);
    if (controllerResponse.success) {
      setReloadAppointments((prevState) => !prevState);
    }
  };

  const onScheduleAppointment = async (appointment: Appointment_instance) => {
    if (user !== "client") return;
    if (appointment.scheduled) return;
    setShowDateModal(dateid);
    setSelectedAppointment(appointment);
  };

  // useEffect
  useEffect(() => {
    (async () => {
      const controllerResponse = await getDateAllAppointments(dateid);
      if (controllerResponse.success) {
        setAppointments(controllerResponse.detail);
      }
    })();
  }, [reloadAppointments]);

  // JSX
  return (
    <div className="flex flex-wrap gap-4 py-4">
      {appointments &&
        appointments.map((appointment: Appointment_instance) => (
          <div
            key={appointment.id}
            className={`cursor-pointer inline-flex px-2 rounded-md text-textcolor1 gap-2 ${appointment.scheduled ? "bg-maincolor" : "bg-green-500"}`}
            onClick={() => {
              if (user === "client") {
                onScheduleAppointment(appointment);
              }
              if (user === "admin" && appointment.scheduled) {
                setShowAppointmentDataModal(dateid);
                setSelectedAppointment(appointment);
              }
            }}
          >
            {appointment.time}
            {!appointment.scheduled && <p>- available</p>}
            {user === "admin" && appointment.scheduled === false && (
              <DeleteForeverIcon
                onClick={() => onAppointmentDelete(appointment.id)}
              />
            )}
          </div>
        ))}
    </div>
  );
};
