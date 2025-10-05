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
const savedTodo = localStorage.getItem('todo');
const todo: Todo = savedTodo ? JSON.parse(savedTodo) : {
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
      localStorage.setItem('todo', JSON.stringify(state));
    },
    updateTodo: (state: Todo, action: { payload: { id: number, status: string } }) => {
      const { id, status } = action.payload;
      if (state.working.find(todo => todo.id === id)) {
        const currentTask = state.working.find(todo => todo.id === id);
        state.working = state.working.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || '', status: 'pending' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
      }
      if (state.pending.find(todo => todo.id === id)) {
        const currentTask = state.pending.find(todo => todo.id === id);
        state.pending = state.pending.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || 'Changed', status: 'pending' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        return;
      }

      if (state.completed.find(todo => todo.id === id)) {
        const currentTask = state.completed.find(todo => todo.id === id);
        state.completed = state.completed.filter((todo) => todo.id !== id);
        if (status === 'pending') {
          state.pending.push({ id, task: currentTask?.task || 'Changed', status: 'pending' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'completed') {
          state.completed.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
        if (status === 'working') {
          state.working.push({ id, task: currentTask?.task || 'Changed', status: 'completed' });
          localStorage.setItem('todo', JSON.stringify(state));
          return;
        }
      }
      localStorage.setItem('todo', JSON.stringify(state));
    },
    deleteTodo: (state: Todo, action: { payload: number }) => {
      const id = action.payload;
      if (state.working.find(todo => todo.id === id)) {
        state.working = state.working.filter((todo) => todo.id !== id);
        localStorage.setItem('todo', JSON.stringify(state));
        return;
      }
      if (state.pending.find(todo => todo.id === id)) {
        state.pending = state.pending.filter((todo) => todo.id !== id);
        localStorage.setItem('todo', JSON.stringify(state));
        return;
      }
      if (state.completed.find(todo => todo.id === id)) {
        state.completed = state.completed.filter((todo) => todo.id !== id);
        localStorage.setItem('todo', JSON.stringify(state));
        return;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
