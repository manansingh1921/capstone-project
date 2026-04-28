import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  xp: 0,
  level: 1,
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const t = state.tasks.find(x => x.id === action.payload);
      if (t) {
        t.completed = !t.completed;

        if (t.completed) {
          const prevLevel = state.level;
          state.xp += t.xp;
          state.level = Math.floor(state.xp / 100) + 1;

          if (state.level > prevLevel) {
            setTimeout(() => {
              document.body.classList.add("level-up");
              setTimeout(() => {
                document.body.classList.remove("level-up");
              }, 400);
            }, 50);
          }
        }
      }
    }
  }
});

export const { addTask, deleteTask, toggleTask } = slice.actions;
export default slice.reducer; 
