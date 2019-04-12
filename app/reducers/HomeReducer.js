import { actionTypes } from "../modules/Constants";

const initialState = {
  tasks: []
};

export default (homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS: {
      const { tasks } = action;
      return {
        ...state,
        tasks
      };
    }
    case actionTypes.DELETE_TASK: {
      const { id } = action;
      const updatedTasks = [...state.tasks].filter(task => task.id !== id);
      return {
        ...state,
        tasks: updatedTasks
      };
    }
    case actionTypes.ADD_TASK: {
      const { task } = action;
      return {
        ...state,
        tasks: [...state.tasks, { ...task }]
      };
    }
    case actionTypes.UPDATE_TASK: {
      const { task: updatedTask } = action;
      const updatedTasks = [...state.tasks].map(task => {
        return task.id === updatedTask.id ? { ...updatedTask } : task;
      });
      return {
        ...state,
        tasks: updatedTasks
      };
    }
    default: {
      return { ...state };
    }
  }
});
