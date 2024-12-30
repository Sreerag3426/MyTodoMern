// import { todo } from 'node:test';
import { useEffect, useState } from "react";
import "./index.css";
const API_URL = "http://localhost:5000";
function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState([]);
  useEffect(() => {
    getTodos();
    console.log(todos);
  }, [todos]);
  const addTodo = async () => {
    const data = await fetch(API_URL + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    console.log(data);
    setNewTodo([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };
  const getTodos = () => {
    fetch(API_URL + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error :", err));
  };
  const deleteTodo = async (id) => {
    const data = await fetch(API_URL + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };
  const completeTodo = async (id) => {
    const data = await fetch(API_URL + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };
  return (
    <div className="app">
      <h1>Hey, Sreerag</h1>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "iscompleted" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <p className="tasks">{todo.text}</p>
            <div className="checkbox" title="complete">
              ✔
            </div>
            <span className="delete" onClick={() => deleteTodo(todo._id)}>
              X
            </span>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            𝕏
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div>
              <button className="btn1" onClick={addTodo}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
