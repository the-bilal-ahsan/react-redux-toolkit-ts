import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

function App() {
  const todo = useSelector((state: RootState) => state.todo);
  console.log(todo);
  return <>Hello React TS</>;
}

export default App;
