export const createAppointment = async (data: {
  time: string;
}): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_CREATEAPPOINTMENT}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const getDateAllAppointments = async (dateid: number): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_GETALLDATEAPPOINTMENTS}${dateid}/`;
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

export const deleteAppointment = async (id: number): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_DELETEAPPOINTMENT}${id}/`;
    const params = {
      method: "DELETE",
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
    return { sucsess: false, detail: error, message: "catch error" };
  }
};

export const updateAppointment = async ({
  id,
  data,
}: {
  id: number;
  data: {
    link: string;
    scheduled: boolean;
    user_email: string;
    user_phone: number;
  };
}): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_UPDATEAPPOINTMENT}${id}/`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    console.log(response, "controllerResponse2");

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
