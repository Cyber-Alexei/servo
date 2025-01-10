import express from "express";
import {
  generateGoogleCalendarAuthUrl,
  getAndSetCalendarAccessUpdateTokens,
  createEvent,
} from "src/controllers/google-calendar.controllers";

const router = express.Router();

router.get("/auth/", generateGoogleCalendarAuthUrl);
router.post("/schedule/", getAndSetCalendarAccessUpdateTokens, createEvent);

export default router;
