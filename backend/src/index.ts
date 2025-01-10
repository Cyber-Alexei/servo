import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

import express from "express";
import datesRouter from "src/routes/dates.routes";
import appointmentsRouter from "src/routes/appointments.routes";
import googleCalendarRouter from "src/routes/google-calendar.routes";
import { sequelize } from "./models";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin: [process.env.FRONTEND!, process.env.FRONTEND2!],
  methods: "*",
  allowedHeaders: "*",
};

app.use(cors(corsOptions));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync();
    console.log("Models synchronized");
    // --------------
    app.use(express.json());

    app.use("/api/dates", datesRouter);
    app.use("/api/appointments", appointmentsRouter);
    app.use("/api/google-calendar", googleCalendarRouter);

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`App running in port: ${PORT}`);
    });
  } catch (error: any) {
    console.error("Unable to connect DB", error.message);
  }
})();
