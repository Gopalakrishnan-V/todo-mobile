import { actionTypes } from "../modules/Constants";
import { fetchTasks, deleteTask } from "../services/ApiServices";
import { Toast } from "native-base";

export const handleFetchTasks = () => {
  return async dispatch => {
    const tasks = await fetchTasks();
    dispatch({
      type: actionTypes.FETCH_TASKS,
      tasks
    });
  };
};

export const handleDeleteTask = id => {
  return async dispatch => {
    const isSuccess = await deleteTask(id);
    if (isSuccess) {
      dispatch({
        type: actionTypes.DELETE_TASK,
        id
      });
      Toast.show({ text: "Task deleted successfully" });
    }
  };
};

export const handleAddTask = task => {
  return {
    type: actionTypes.ADD_TASK,
    task
  };
};

export const handleUpdateTask = task => {
  return {
    type: actionTypes.UPDATE_TASK,
    task
  };
};
