import express from "express";
import {
  getAllDateAppoinments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "src/controllers/appoinments.controllers";

const router = express.Router();

router.get("/get/:dateid/", getAllDateAppoinments);
router.post("/post/", createAppointment);
router.put("/put/:id/", updateAppointment);
router.delete("/delete/:id/", deleteAppointment);
export default router;
