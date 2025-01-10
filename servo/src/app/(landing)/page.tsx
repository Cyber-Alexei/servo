"use client";
import Image from "next/image";
import { Date_instance } from "@/ts-types";
import { getAllDates } from "@/controllers/dates.controllers";
import { NextPage } from "next";
import { DatesList } from "@/components/dates/dates_list";
import { Container } from "@/components/container/container";
import { useState, useEffect } from "react";

const Home: NextPage = (): JSX.Element => {
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
    <div>
      {/*Container*/}
      <Container>
        <div className="flex flex-row py-4 flex-wrap items-center justify-center w-full min-h-[calc(100vh-60px)]">
          <div className="flex flex-col w-[50%] min-w-[300px] items-start justify-start">
            <div className="flex flex-col md:items-center gap-4">
              <div className="inline-flex items-center gap-1">
                <p>For </p>
                <p className="font-semibold text-4xl">
                  <span className="text-blue-600">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-400">o</span>
                  <span className="text-blue-600">g</span>
                  <span className="text-green-700">l</span>
                  <span className="text-red-500">e</span>
                </p>
              </div>
              <p className="font-semibold text-2xl">
                Welcome to <span className="text-maincolor">Servo</span>!
              </p>

              <p>The site for your appointments.</p>
              <p className="md:text-center">
                Schedule your interview. <br></br>Take a look at the available
                dates and choose the one that best suits you.
              </p>
              <p className="font-semibold text-xl">
                Select the one you prefer!
              </p>
            </div>
          </div>
          <div className="w-[50%] min-w-[400px] h-[400px] justify-center items-center bg-[url(/images/homepage.png)] bg-contain bg-no-repeat bg-center"></div>
        </div>
        {/*Container*/}
      </Container>
      <div className="flex items-center justify-center text-white text-[8dvw] font-semibold min-h-[20vh] bg-purple-500">
        <p className="opacity-30 leading-none">Appointments</p>
      </div>
      <Container>
        <div className="min-h-[80vh] w-full py-10 text-center ">
          <h2 className="py-[5dvh] font-medium">
            Please chose a date and an hour to schedule your interview in
            <span> </span>
            <span className="text-blue-600 text-xl">G</span>
            <span className="text-red-500 text-xl">o</span>
            <span className="text-yellow-400 text-xl">o</span>
            <span className="text-blue-600 text-xl">g</span>
            <span className="text-green-700 text-xl">l</span>
            <span className="text-red-500 text-xl">e</span>
            <span> </span>
            meets
          </h2>
          <div className="bg-gray-100 p-4 w-[80%] min-w-[350px] mx-auto rounded-md">
            <DatesList
              user="client"
              datesData={datesData}
              setReload={setReload}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
