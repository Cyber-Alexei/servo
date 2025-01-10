import { Request, Response } from "express";
import { Appointments } from "src/models/appointments.models";

export const getAllDateAppoinments = async (req: Request, res: Response) => {
  try {
    const { dateid } = req.params;
    const appointments = await Appointments.findAll({
      where: {
        dateid: dateid,
      },
    });
    if (!appointments) {
      res.status(404).send("Not appointments found");
    } else {
      res.status(200).json(appointments);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { time, dateid } = req.body;
    if (!time || !dateid) {
      res.status(400).json("Missing data");
    } else {
      const newAppointment = await Appointments.create(req.body);
      res.status(200).json(newAppointment);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointments.findByPk(id);
    if (!appointment) {
      res.status(404).send("Not appointment found");
    } else {
      await appointment?.update(req.body);
      res.status(200).json(appointment);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointments.findByPk(id);
    if (!appointment) {
      res.status(404).json("Not appointment found");
    } else {
      await appointment?.destroy();
      res.status(200).json("Appointment was deleted");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
