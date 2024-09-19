import { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      setTitle("");
      setDescription("");
      await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleChangeTitle}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={handleChangeDescription}
      />
      <br />
      <button onClick={handleSubmit}>Add a Todo</button>
    </div>
  );
};

export default CreateTodo;
