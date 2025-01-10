"use client";
import { NextPage } from "next";
import { Container } from "@/components/container/container";
import { generateGoogleCalendarAuthUrl } from "@/controllers/google-calendar.controllers";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const AuthorizationPage: NextPage = (): JSX.Element => {
  // State
  const [googleCalendarAuthUrl, setGoogleCalendarAuthUrl] =
    useState<string>("");
  // useEffect
  useEffect(() => {
    (async () => {
      const controllerResponse = await generateGoogleCalendarAuthUrl();
      console.log(controllerResponse, "CR KK");
      if (controllerResponse.success) {
        setGoogleCalendarAuthUrl(controllerResponse.detail);
      }
    })();
  }, []);
  // JSX
  return (
    <div className="flex h-[calc(100vh-60px)]">
      <Container>
        <div className="flex items-center justify-center h-full">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--maincolor)",
              "&:hover": { backgroundColor: "var(--secondarycolor)" },
            }}
            onClick={() => (window.location.href = googleCalendarAuthUrl)}
          >
            Give authorization to your Google Calendar
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default AuthorizationPage;
