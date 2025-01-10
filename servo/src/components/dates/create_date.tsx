"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { createDate } from "@/controllers/dates.controllers";
import Button from "@mui/material/Button";
import { Eventdata } from "@/ts-types";

export const CreateDate = ({
  setReload,
}: {
  setReload: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  // State
  const [eventData, setEventData] = useState<Eventdata>({
    date: "",
    summary: "",
    description: "",
    timezone: "America/Mexico_City",
    admin_email: "",
  });

  // Handle events
  const onInputsChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeTimeZoneSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const onCreateEvent = async (e: any) => {
    e.preventDefault();
    if (
      !eventData.date ||
      !eventData.summary ||
      !eventData.description ||
      !eventData.timezone ||
      !eventData.admin_email
    ) {
      return;
    }
    const controllerResponse = await createDate(eventData);
    if (controllerResponse.success) {
      setEventData({
        date: "",
        summary: "",
        description: "",
        timezone: "",
        admin_email: "",
      });
      setReload((prevState) => !prevState);
    }
  };

  // Tailwind
  const inputStyle = `rounded-tl-md rounded-bl-md focus:outline-none px-2 caret-gray-400`;

  // JSX
  return (
    <div className="flex justify-center text-gray-500">
      <div className="inline-flex flex-col items-center min-w-[300px] bg-gray-100 rounded-md py-6 px-4 gap-6">
        <p className="text-lg py-4 font-medium">Create a date</p>
        <form onSubmit={onCreateEvent} className="flex flex-col gap-2 w-full">
          <input
            required
            name="date"
            className={inputStyle}
            type="date"
            value={eventData.date}
            onChange={(e) => onInputsChange(e)}
            placeholder="Title"
          />
          <input
            required
            name="summary"
            className={inputStyle}
            type="text"
            value={eventData.summary}
            onChange={(e) => onInputsChange(e)}
            placeholder="Summary"
          />
          <input
            required
            name="description"
            className={inputStyle}
            type="text"
            value={eventData.description}
            onChange={(e) => onInputsChange(e)}
            placeholder="Description"
          />
          <input
            required
            name="admin_email"
            className={inputStyle}
            type="email"
            value={eventData.admin_email}
            onChange={(e) => onInputsChange(e)}
            placeholder="Admin email"
          />
          <label>Time zone:</label>
          <select
            required
            id="timezone"
            name="timezone"
            onChange={(e) => onChangeTimeZoneSelect(e)}
          >
            <option value="America/Mexico_City">
              America/Mexico_City (GMT-6)
            </option>
            <option value="America/New_York">America/New_York (GMT-5)</option>
            <option value="Europe/London">Europe/London (GMT+0)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
          </select>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginY: "15px",
              paddingTop: "1px",
              paddingBottom: "0px",
              backgroundColor: "var(--maincolor)",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
