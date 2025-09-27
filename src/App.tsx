import { useSelector } from "react-redux";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { fetchTodosRedux } from "./store/slices/todo";
import { useAppDispatch, type RootState } from "./store/store";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.todo);

  return isLoading ? (
    <>Loading Todos</>
  ) : (
    <>
      <button onClick={() => dispatch(fetchTodosRedux())}>Fetch Todos</button>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
