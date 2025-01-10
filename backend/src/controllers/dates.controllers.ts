import { Request, Response } from "express";
import { Dates } from "src/models/dates.models";

export const getAllDates = async (req: Request, res: Response) => {
  try {
    const dates = await Dates.findAll();
    res.status(200).json(dates);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const createDate = async (req: Request, res: Response) => {
  try {
    const newDate = await Dates.create(req.body);
    res.status(200).json(newDate);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const date_instance = await Dates.findByPk(id);
    if (!date_instance) {
      res.status(404).json("Not event found");
    } else {
      await date_instance!.update({ date: date });
      res.status(200).json(date_instance);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const date = await Dates.findByPk(parseInt(id));
    if (!date) {
      res.status(404).json("Not event found");
    } else {
      await date!.destroy();
      res.status(200).json("Event was deleted");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
