export const generateGoogleCalendarAuthUrl = async (): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_AUTH}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);

    if (response.ok) {
      const result = await response.json();
      return { success: true, detail: result };
    }

    const result = await response.json();
    return { success: false, detail: result };
  } catch (error) {
    return { success: false, detail: error, message: "catch error" };
  }
};

export const createEvent = async ({
  code,
  data,
}: {
  code: string;
  data: {
    summary: string;
    description: string;
    timezone: string;
    admin_email: string;
    user_email: string;
    datetime: string;
    datetimeend: string;
  };
}): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_CREATE_EVENT}?code=${code}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log(url, "KKK URL");
    const response = await fetch(url, params);
    console.log(response, "controllerResponse1");

    if (response.ok) {
      const result = await response.json();
      return { success: true, detail: result };
    }

    const result = await response.json();
    return { success: false, detail: result };
  } catch (error) {
    return { success: false, detail: error, message: "catch error" };
  }
};
