import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({ title: "", desc: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!input.title.trim()) return; // prevent empty todos
    const newTodo = {
      id: Date.now(),
      title: input.title,
      desc: input.desc,
      isComplete: false
    };
    setTodos([...todos, newTodo]);
    setInput({ title: "", desc: "" });
  };

  const handleMark = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h1 className="fw-bold text-primary">To-do App</h1>
          </div>

          {/* Input Section */}
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm p-3 mb-4">
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    name="desc"
                    value={input.desc}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                </div>
                <div className="col-md-3 d-grid">
                  <button className="btn btn-primary" onClick={handleAdd}>
                    Add Todo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Todo List */}
          <div className="col-md-8 mx-auto">
            {todos.length === 0 ? (
              <p className="text-muted text-center">No todos yet. Add one!</p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className="card shadow-sm mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5
                        className={`card-title ${
                          todo.isComplete ? "text-decoration-line-through text-muted" : ""
                        }`}
                      >
                        {todo.title}
                      </h5>
                      <p className="card-text">{todo.desc}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-sm ${
                          todo.isComplete ? "btn-warning" : "btn-success"
                        }`}
                        onClick={() => handleMark(todo.id)}
                      >
                        {todo.isComplete ? "Undo" : "Complete"}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
