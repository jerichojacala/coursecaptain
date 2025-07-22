// src/app/auth/utils.ts
import wretch from "wretch";
import Cookies from "js-cookie";

// Base API setup for making HTTP requests
const api = wretch(`${process.env.NEXT_PUBLIC_API_URL}`).accept("application/json");

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const register = (email: string, username: string, password: string) => {
  return api.post({ email, username, password }, "/auth/users/");
};

const login = (username: string, password: string) => {
  return api.post({ username: username, password }, "/auth/jwt/create/");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/jwt/refresh/");
};

const resetPassword = (email: string) => {
  return api.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
) => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "/auth/users/reset_password_confirm/"
  );
};

/**
 * Registers the currently logged-in student for a course.
 * @param courseId - The ID of the course to register for.
 * @returns Response JSON or throws an error.
 */
export async function createSchedule(title = "My Schedule") {
  const accessToken = getToken("access");

  if (!accessToken) {
    throw new Error("User not authenticated. No access token found.");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title: "My Schedule" }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Schedule creation failed");
  }

  return res.json();
}

export async function deleteSchedule(scheduleId: number) {
  const accessToken = getToken("access");

  if (!accessToken) {
    throw new Error("User not authenticated. No access token found.");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/delete/${scheduleId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: "",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Schedule creation failed");
  }
}

export async function updateSchedule(scheduleId: number, newTitle: string){
  const accessToken = getToken("access");

  if (!accessToken) {
    throw new Error("User not authenticated. No access token found.");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/update/${scheduleId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // if using JWT
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!res.ok) {
    throw new Error("Failed to update schedule");
  }

  return await res.json();
}

export async function createRegistration(scheduleId: number, courseId: number) {
  const accessToken = getToken("access");

  if (!accessToken) {
    throw new Error("User not authenticated. No access token found.");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ schedule: scheduleId, course: courseId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.detail || "Schedule creation failed");
  }

  return res.json();
}

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    storeToken,
    getToken,
    logout,
    removeTokens,
    createSchedule,
  };
};