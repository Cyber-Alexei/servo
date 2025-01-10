import { Date_instance } from "@/ts-types";
import Link from "next/link";
import { Appointment_instance } from "@/ts-types";
import { CreateAppointment } from "@/components/appointments/create_appointment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AppointmentsList } from "@/components/appointments/appointments_list";
import { DateModal } from "@/components/dates/date_modal";
import { deleteDate } from "@/controllers/dates.controllers";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";

export const Date = ({
  user,
  date,
  setReload,
}: {
  user: string;
  date: Date_instance;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  // State
  const [reloadAppointments, setReloadAppointments] = useState<boolean>(false);
  const [showDateModal, setShowDateModal] = useState<number | null>(null);
  const [showAppointmentDataModal, setShowAppointmentDataModal] = useState<
    number | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment_instance | null>(null);

  // Handle events
  const onEventDelete = async () => {
    const controllerResponse = await deleteDate(date.id);
    if (controllerResponse.success) {
      setReload((prevState) => !prevState);
    }
  };

  // JSX
  return (
    <div className="relative px-2 py-4 bg-white rounded-md">
      <div className="flex justify-between flex-wrap">
        <div>
          <p className="text-maincolor font-semibold text-lg">{date.date}</p>
          <p className="text-maincolor font-semibold text-sm">{date.summary}</p>
        </div>
        <div>
          <p className="text-maincolor font-semibold">{date.timezone}</p>
          <p className="text-maincolor font-semibold text-sm">
            {date.description}
          </p>
        </div>
        <div className="w-[40px]"></div>
        {user === "admin" && (
          <DeleteForeverIcon
            sx={{
              color: "var(--maincolor)",
              "&:hover": { color: "var(--secondarycolor)" },
            }}
            onClick={onEventDelete}
          />
        )}
      </div>
      {user === "admin" && (
        <CreateAppointment
          dateId={date.id}
          setReloadAppointments={setReloadAppointments}
        />
      )}
      <AppointmentsList
        user={user}
        dateid={date.id}
        setShowDateModal={setShowDateModal}
        setSelectedAppointment={setSelectedAppointment}
        setShowAppointmentDataModal={setShowAppointmentDataModal}
        reloadAppointments={reloadAppointments}
        setReloadAppointments={setReloadAppointments}
      />
      {showDateModal === date.id && selectedAppointment && (
        <DateModal
          selectedAppointment={selectedAppointment}
          date={date}
          setShowDateModal={setShowDateModal}
          setSelectedAppointment={setSelectedAppointment}
        />
      )}
      {showAppointmentDataModal === date.id && selectedAppointment && (
        <div className="absolute py-4 px-2 flex flex-col gap-4 bg-white h-full w-full top-0 left-0">
          <div className="flex gap-4">
            <p className="font-semibold text-maincolor">Id:</p>
            <p>{selectedAppointment.id}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold text-maincolor">Date:</p>
            <p>{selectedAppointment.time}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold text-maincolor">
              Google calendar meet link:
            </p>
            <Link href={selectedAppointment.link}>
              {selectedAppointment.link}
            </Link>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold text-maincolor">User data:</p>
            <p>{selectedAppointment.user_email}</p>
            <p>{selectedAppointment.user_phone}</p>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--maincolor)",
              fontWeight: "600",
              fontSize: "13px",
              paddingTop: "3px",
              paddingBottom: "2px",
            }}
            onClick={() => {
              setShowAppointmentDataModal(null);
              setSelectedAppointment(null);
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
