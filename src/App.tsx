import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, updateTodo } from "./Redux/Reducers";
import React from "react";
import ModalPopup from "./ModalPopup";

interface TodoType {
  id: number;
  task: string;
  status: "completed" | "pending" | "working";
}

interface Todo {
  completed: TodoType[];
  pending: TodoType[];
  working: TodoType[];
}

function App() {
  const [newTodo, setNewTodo] = React.useState<string>("");
  const [modalPopupOpen, setModalPopupOpen] = React.useState<{
    id: number | null;
    todo: string;
    open: boolean;
  }>({ id: null, todo: "", open: false });
  const dispatch = useDispatch();
  const data: Todo = useSelector(
    (state: { todoStore: Todo }) => state.todoStore
  );

  // ✅ Corrected function syntax
  const handleUpdateTodo = (
    id: number,
    status: "completed" | "pending" | "working"
  ) => {
    dispatch(updateTodo({ id, status }));
  };

  const handleDeleteTodo = (id: number, todo: string) => {
    setModalPopupOpen({ id: id, todo: todo, open: true });
  };

  const deleteTodoFinal = (id: number) => {
    dispatch(deleteTodo(id));
    setModalPopupOpen({ id: null, todo: "", open: false });
  };

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmitTodo = () => {
    dispatch(addTodo({ id: Date.now(), task: newTodo, status: "pending" }));
    setNewTodo("");
  };

  const closeModalPopup = () => {
    setModalPopupOpen({ id: null, todo: "", open: false });
  }

  return (
    <div className="App">
      {modalPopupOpen.open && (
        <ModalPopup
          id={modalPopupOpen.id}
          todo={modalPopupOpen.todo}
          closeModal={closeModalPopup}
          deleteTodoFinal={deleteTodoFinal}
        />
      )}
      <h1 className="title">Advanced Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodo}
          placeholder="Add a new task..."
        />
        {newTodo.trim() === "" ? (
          <button disabled style={{ cursor: "not-allowed", opacity: 0.5 }}>
            Add
          </button>
        ) : (
          <button onClick={handleSubmitTodo}>Add</button>
        )}
      </div>
      <div className="todo-container">
        {/* Pending */}
        <div className="todo-column">
          <h2>🕓 Pending</h2>
          {data.pending.map((todo) => (
            <div key={todo.id} className="todo-item pending">
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{todo.task}</span>
                <span style={{ fontSize: "20px" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "working")}
                  >
                    ⚙️
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "completed")}
                  >
                    ✅
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleDeleteTodo(todo.id, todo.task)}
                  >
                    ❌
                  </span>
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Working */}
        <div className="todo-column">
          <h2>⚙️ Working</h2>
          {data.working.map((todo) => (
            <div key={todo.id} className="todo-item working">
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{todo.task}</span>
                <span style={{ fontSize: "20px" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "pending")}
                  >
                    🕓
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "completed")}
                  >
                    ✅
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleDeleteTodo(todo.id, todo.task)}
                  >
                    ❌
                  </span>
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Completed */}
        <div className="todo-column comlpetedColumn">
          <h2>✅ Completed</h2>
          {data.completed.map((todo) => (
            <div key={todo.id} className="todo-item completed">
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{todo.task}</span>
                <span style={{ fontSize: "20px" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "pending")}
                  >
                    🕓
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleUpdateTodo(todo.id, "working")}
                  >
                    ⚙️
                  </span>
                  <span
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleDeleteTodo(todo.id, todo.task)}
                  >
                    ❌
                  </span>
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
