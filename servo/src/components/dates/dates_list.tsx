import { Date_instance } from "@/ts-types";
import { Date } from "@/components/dates/date";
import { Dispatch, SetStateAction } from "react";

export const DatesList = ({
  user,
  datesData,
  setReload,
}: {
  user: string;
  datesData: Date_instance[] | string | null;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {typeof datesData === "string" && <p>{datesData}</p>}
      {typeof datesData !== "string" &&
        datesData !== null &&
        datesData.map((date: Date_instance) => (
          <Date key={date.id} user={user} date={date} setReload={setReload} />
        ))}
    </div>
  );
};
