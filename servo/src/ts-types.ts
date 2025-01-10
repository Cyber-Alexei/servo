export type Appointment_instance = {
  id: number;
  time: string;
  link: string;
  scheduled: boolean;
  user_email: string;
  user_phone: number;
  dateid: number;
};

export type Date_instance = {
  id: number;
  date: string;
  summary: string;
  description: string;
  timezone: string;
  admin_email: string;
};

export type Eventdata = {
  date: string;
  summary: string;
  description: string;
  timezone: string;
  admin_email: string;
};
