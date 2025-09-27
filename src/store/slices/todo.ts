import {
  createAsyncThunk,
  createSlice,
  nanoid,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  id: string;
  text: string;
}
interface FetchTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface InitialState {
  isLoading: boolean;
  isError: boolean;
  list: Todo[];
}
// interface UpdateTodoPayload {
//   id: string;
//   updates: Partial<Omit<Todo, "id">>; // Can update any field except id
// }

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  list: [],
} as const;
export const fetchTodosRedux = createAsyncThunk("fetchTodosRedux", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  console.log("res", res);
  return res.data.map((i: FetchTodo) => ({ id: String(i.id), text: i.title }));
});

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
  extraReducers(builder) {
    builder.addCase(fetchTodosRedux.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodosRedux.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchTodosRedux.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
  },
});

export const { addTodoRedux, updateTodoRedux, removeTodoRedux } =
  todoSlice.actions;

export default todoSlice.reducer;
