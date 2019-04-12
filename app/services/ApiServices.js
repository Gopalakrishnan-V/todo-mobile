import axios from "axios";
import { Alert } from "react-native";
import APIS from "../modules/APIS";
import { getToken } from "./TokenServices";

export const fetchTasks = async () => {
  let token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: APIS.TASKS,
      headers: { "x-auth-token": token }
    });
    const data = response.data.data;
    return data.tasks;
  } catch (error) {
    const errorResponse = error.response.data;
    // alert(errorResponse.error.message);
    return [];
  }
};

export const deleteTask = async id => {
  let token = await getToken();
  try {
    const response = await axios({
      method: "delete",
      url: APIS.TASKS + id,
      headers: { "x-auth-token": token }
    });
    const data = response.data.data;
    return true;
  } catch (error) {
    const errorResponse = error.response.data;
    return false;
  }
};

export const addTask = async task => {
  let token = await getToken();
  try {
    const response = await axios({
      method: "post",
      url: APIS.TASKS,
      data: { text: task.text },
      headers: { "x-auth-token": token }
    });

    const data = response.data.data;
    return data.task;
  } catch (error) {
    const errorResponse = error.response.data;
    return null;
  }
};

export const updateTask = async task => {
  let token = await getToken();
  try {
    const response = await axios({
      method: "put",
      url: APIS.TASKS + task.id,
      data: { text: task.text },
      headers: { "x-auth-token": token }
    });
    const data = response.data.data;
    return data.task;
  } catch (error) {
    const errorResponse = error.response.data;
    return null;
  }
};
