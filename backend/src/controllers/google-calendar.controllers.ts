import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { Request, Response, NextFunction } from "express";

// Data for the client URL Google Calendar authorization. OAuth credentials.
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
// Init the OAuth2 client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// Init Google Calendar client
const calendar: any = google.calendar({ version: "v3", auth: oAuth2Client });

//////////////////////

export const generateGoogleCalendarAuthUrl = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // Generate authorization URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline", // Request a refresh token for future accesses
      scope: ["https://www.googleapis.com/auth/calendar"], // Request access to google calendar
    });

    // Return the url
    res.status(200).json(authUrl);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAndSetCalendarAccessUpdateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const code: string = req.query.code as string; // Retrive the authorized code of the URL
    const { tokens } = await oAuth2Client.getToken(code).catch((error) => {
      console.log("Error when getting Token with oAuth2Client", error);
      throw error;
    }); // Change code for access and aupdate tokens
    oAuth2Client.setCredentials(tokens); // Set credentials in the client

    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createEvent = async (req: any, res: Response) => {
  try {
    const {
      summary,
      description,
      timezone,
      admin_email,
      user_email,
      datetime,
      datetimeend,
    } = req.body;
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: datetime, // Fecha y hora de inicio (formato ISO 8601)
        timeZone: timezone, // Zona horaria
      },
      end: {
        dateTime: datetimeend, // Fecha y hora de finalización
        timeZone: timezone, // Zona horaria
      },
      attendees: [
        { email: admin_email }, // Invitar a participantes
        { email: user_email },
      ],
      conferenceData: {
        createRequest: {
          requestId: `scheduled-${Date.now()}`, // Identificador único para la solicitud de conferencia
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary", // Calendario principal del usuario
      resource: event,
      conferenceDataVersion: 1, // Activar conferencias
    });

    res.status(200).json({
      message: "Event successfully created",
      link: response.data.hangoutLink, // Enlace a Google Meet
      event: response.data,
    });
  } catch (error) {
    res.status(400).json({ error: error, message: "Error from backend" });
  }
};
