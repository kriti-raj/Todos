import { useEffect, useState } from "react";

const GetTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const data = await fetch("http://localhost:3000/todos");
      const res = await data.json();
      //   console.log(res);
      setTodos(res.todos);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  const handleSubmit = (e, todoId) => {
    e.preventDefault();
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({
        _id: todoId,
      }),
    });
  };

  const handleDelete = (e, todoId) => {
    e.preventDefault();
    fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({
        _id: todoId,
      }),
    });
  };

  return (
    <>
      <h1>Todo List</h1>
      <hr />
      {todos.map((todo, index) => (
        <div key={index}>
          <h1>
            {todo.title}{" "}
            <span>
              {" "}
              - <button onClick={(e) => handleDelete(e, todo._id)}>❌</button>
            </span>
          </h1>
          <h2>{todo.description}</h2>
          <button onClick={(e) => handleSubmit(e, todo._id)}>
            {todo.completed === true ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </>
  );
};

export default GetTodo;
