import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoRedux } from "../store/slices/todo";
const AddTodo = () => {
  const [input, setInput] = useState<string>("");

  const dispatch = useDispatch();

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodoRedux(input));
    setInput("");
  };

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default AddTodo;
