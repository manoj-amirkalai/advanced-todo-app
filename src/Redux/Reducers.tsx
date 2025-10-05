import { createSlice } from "@reduxjs/toolkit";

interface TodoType {
  id: number;
  task: string;
  status: 'completed' | 'pending' | 'working';
}
interface Todo {
  completed: TodoType[];
  pending: TodoType[];
  working: TodoType[];
}
const todo: Todo = {
  completed: [],
  pending: [],
  working: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: todo,
  reducers: {
    addTodo: (state: Todo, action: { payload: TodoType }) => {
      state.pending.push(action.payload);
    },
    updateTodo: (state: Todo, action: { payload: { id: number, status: string } }) => {
      const { id, status } = action.payload;
      if (state.working.find(todo => todo.id === id)) {
        const currentTask = state.working.find(todo => todo.id === id);
        state.working = state.working.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || '', status: 'pending' });
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
      }
      if (state.pending.find(todo => todo.id === id)) {
        const currentTask = state.pending.find(todo => todo.id === id);
        state.pending = state.pending.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || 'Changed', status: 'pending' });
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
        return;
      }

      if (state.completed.find(todo => todo.id === id)) {
        const currentTask = state.completed.find(todo => todo.id === id);
        state.completed = state.completed.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || 'Changed', status: 'pending' });
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          return;
        }
      }

    },
    deleteTodo: (state: Todo, action: { payload: number }) => {
      const id = action.payload;
      if (state.working.find(todo => todo.id === id)) {
        state.working = state.working.filter((todo) => todo.id !== id);
        return;
      }
      if (state.pending.find(todo => todo.id === id)) {
        state.pending = state.pending.filter((todo) => todo.id !== id);
        return;
      }
      if (state.completed.find(todo => todo.id === id)) {
        state.completed = state.completed.filter((todo) => todo.id !== id);
        return;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
