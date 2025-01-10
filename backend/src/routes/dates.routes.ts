import express from "express";
import {
  getAllDates,
  createDate,
  updateDate,
  deleteDate,
} from "src/controllers/dates.controllers";

const router = express.Router();

router.get("/get/", getAllDates);
router.post("/post/", createDate);
router.put("/put/:id/", updateDate);
router.delete("/delete/:id/", deleteDate);
export default router;
