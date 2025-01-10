import { Eventdata } from "@/ts-types";

export const createDate = async (data: Eventdata): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_CREATEEVENT}`;
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

export const getAllDates = async (): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_GETALLEVENTS}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(url);
    const response = await fetch(url, params);

    if (response.ok) {
      const result = await response.json();
      return { success: true, detail: result };
    }

    const result = await response.json();
    return { success: false, detail: result };
  } catch (error) {
    return { success: false, detail: error, message: "catch-error" };
  }
};

export const deleteDate = async (id: number): Promise<any> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}${process.env.NEXT_PUBLIC_DELETEEVENT}${id}/`;
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
    return { success: false, detail: error, message: "catch error" };
  }
};
