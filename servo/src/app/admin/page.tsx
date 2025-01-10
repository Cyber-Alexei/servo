"use client";
import { Container } from "@/components/container/container";
import { CreateDate } from "@/components/dates/create_date";
import { DatesList } from "@/components/dates/dates_list";
import { getAllDates } from "@/controllers/dates.controllers";
import { Date_instance } from "@/ts-types";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const AdminPage: NextPage = () => {
  // State
  const [datesData, setDatesData] = useState<Date_instance[] | string | null>(
    null,
  );
  const [reload, setReload] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    (async () => {
      const controllerResult = await getAllDates();
      if (controllerResult.success) {
        setDatesData(controllerResult.detail);
      } else {
        setDatesData("Error when fetching events");
      }
    })();
  }, [reload]);

  // JSX
  return (
    <div className="text-textcolor2 py-20 h-auto">
      <Container>
        <CreateDate setReload={setReload} />
        <div className="w-full text-center h-[16dvh] flex items-center justify-center"></div>
        <div className="bg-gray-100 p-4 w-[80%] min-w-[350px] mx-auto rounded-md">
          <DatesList user="admin" datesData={datesData} setReload={setReload} />
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
