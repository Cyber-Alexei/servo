import { Sequelize } from "sequelize";
import { Dates } from "./dates.models";
import { Appointments } from "./appointments.models";

if (!process.env.DB_URI) {
  throw new Error("Database URI is not defined");
}

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
});

// Init models
Dates.initModel(sequelize);
Appointments.initModel(sequelize);

export { sequelize, Dates, Appointments };
