import { useDispatch, useSelector } from "react-redux";
import { removeTodoRedux, updateTodoRedux } from "../store/slices/todo";
import { useState } from "react";
import type { RootState } from "../store/store";

function Todos() {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const { list } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  console.log("todos", list);
  return (
    <>
      {list.map((todo) => {
        const isEdit = edit === todo.id;
        return (
          <div key={todo.id}>
            {isEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(updateTodoRedux({ ...todo, text: input }));
                  setInput("");
                  setEdit("");
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <span style={{ width: "400px" }}>
                {todo.text} - {todo.id}
              </span>
            )}
            {!isEdit && (
              <button
                onClick={() => {
                  setInput(todo.text);
                  setEdit(todo.id);
                }}
              >
                Edit
              </button>
            )}
            <button onClick={() => dispatch(removeTodoRedux(todo.id))}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Todos;
