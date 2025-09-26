import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
}

interface InitialState {
  isLoading: boolean;
  isError: boolean;
  list: Todo[];
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoRedux: (state: InitialState, action: PayloadAction<string>) => {
      state.list.push({ id: nanoid(), text: action.payload });
    },
    updateTodoRedux: (state: InitialState, action: PayloadAction<Todo>) => {
      const updatingTodo: Todo = action.payload;
      state.list = state.list.map((todo: Todo) =>
        todo.id === updatingTodo.id ? updatingTodo : todo
      );
    },
    removeTodoRedux: (state: InitialState, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (todo: Todo) => todo.id !== action.payload
      );
    },
  },
});

export const { addTodoRedux, updateTodoRedux, removeTodoRedux } =
  todoSlice.actions;

export default todoSlice.reducer;
